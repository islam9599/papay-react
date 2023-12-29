import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";
import { useParams } from "react-router-dom";
// import CheckBox from "@mui/material/CheckBox";
import assert from "assert";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { retrieveChosenProduct, retrieveChosenRestaurant } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setChosenRestaurant } from "./slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
});
/** Redux Selector*/
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);

const chosen_list = Array.from(Array(3).keys());

export function ChosenDish(props: any) {
  /** Intializations */
  const { setChosenRestaurant, setChosenProduct } = actionDispatch(
    useDispatch()
  );
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);

  let { dish_id } = useParams<{ dish_id: string }>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosendish(dish_id);
      setChosenProduct(product);

      const restaurantService = new RestaurantApiService();
      const restaurant = await restaurantService.getChosenRestaurant(
        product.restaurant_mb_id
      );
      setChosenRestaurant(restaurant);
    } catch (err) {
      console.log("dishRelatedProcess: err", err);
    }
  };
  console.log(chosenProduct, chosenProduct, chosenProduct);
  useEffect(() => {
    dishRelatedProcess().then();
  }, [productRebuild]);

  /** Handlers */

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      setProductRebuild(new Date());

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("err: targetLikeProduct", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="chosen_dish">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={image_path}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            loop={true}
            spaceBetween={20}
            freeMode={true}
            slidesPerView={chosenProduct?.product_images.length}
            watchSlidesProgress={true}
            centeredSlides={false}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper chosen_dish_swiper_second"
          >
            {chosenProduct?.product_images.map((ele) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide className="swiper_second_slider">
                  <img src={image_path} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className="chosen_dish_info_container">
          <Box className="chosen_dish_wrapper">
            <strong className="dish_txt">{chosenProduct?.product_name} </strong>
            <span className="resto_name">
              {chosenRestaurant?.mb_nick} Restaurant
            </span>
            <Box className="rating_box">
              <Rating
                className="half_rating"
                defaultValue={3.5}
                precision={0.5}
              />
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    {...label}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={
                      chosenProduct?.me_liked &&
                      chosenProduct.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
                  />
                  <span>{chosenProduct?.product_likes} ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEye style={{ marginRight: "10px" }} />
                  <span>{chosenProduct?.product_views} ta</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description!!!"}
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000"
            />
            <div className="dish_price_box">
              <span>Narxi</span>
              <span>${chosenProduct?.product_price}</span>
            </div>
            <div className="btn_box">
              <Button
                variant="contained"
                onClick={(e) => {
                  props.onAdd(chosenProduct);
                }}
              >
                Savatga qo’shish
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
