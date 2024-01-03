import React, { useEffect, useRef, useState } from "react";

import {
  ArrowBack,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  MonetizationOn,
  RemoveRedEye,
  Search,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
import { Badge, Box, Button, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import { useHistory, useParams } from "react-router-dom";
import assert from "assert";
import { Product } from "../../../types/product";
import { ProductSearchObj } from "../../../types/others";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import {
  retrieveChosenRestaurant,
  retrieveRandomRestaurants,
  retrieveTargetProducts,
  retrieveTargetRestaurants,
} from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenRestaurant,
  setRandomRestaurants,
  setTargetProducts,
  setTargetRestaurants,
} from "./slice";
import { verifiedMemberdata } from "../../apiServices/verify";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setRandomRestaurants: (data: Restaurant[]) =>
    dispatch(setRandomRestaurants(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});
/** Redux Selector*/
const randomRestaurantsRetriever = createSelector(
  retrieveRandomRestaurants,
  (randomRestaurants) => ({
    randomRestaurants,
  })
);
const chosenRestaurantsRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);
export function OneRestaurant(props: any) {
  /** Initialization */
  let { restaurant_id } = useParams<{ restaurant_id: string }>();
  const { setChosenRestaurant, setRandomRestaurants, setTargetProducts } =
    actionDispatch(useDispatch());

  const { randomRestaurants } = useSelector(randomRestaurantsRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantsRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenRestaurantId, setChosenRestaurantId] =
    useState<string>(restaurant_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createAt",
      restaurant_mb_id: restaurant_id,
      product_collection: "dish",
    });
  const history = useHistory();
  const refs: any = useRef([]);
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants({ page: 1, limit: 10, order: "random" })
      .then((data) => {
        setRandomRestaurants(data);
      })
      .catch((err) => console.log(err));
    restaurantService
      .getChosenRestaurant(chosenRestaurantId)
      .then((data) => setChosenRestaurant(data))
      .catch((err) => console.log(err));
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => {
        setTargetProducts(data);
      })
      .catch((err) => console.log(err));
  }, [chosenRestaurantId, targetProductSearchObj, productRebuild]);

  /** Handlers */
  const chosenRestaurantHandler = (id: string) => {
    setChosenRestaurantId(id);
    targetProductSearchObj.restaurant_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/restaurant/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };

  const chosenDishHandler = (id: string) => {
    history.push(`/restaurant/dish/${id}`);
  };

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberdata, Definer.auth_err1);

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
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>Texas De Brazil Restaurant</p>
              <Box className="single_search_big_box">
                <form className="single_search_form" action="">
                  <input
                    type={"search"}
                    className={"search_input"}
                    name={"resSearch"}
                    placeholder="qidiruv"
                  />
                  <Button
                    className="button_search"
                    variant="contained"
                    endIcon={<Search />}
                  >
                    Izlash
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginTop: "35px",
              alignItems: "center",
            }}
          >
            <Box className="prev_btn restaurant-prev">
              <ArrowBack style={{ fontSize: 40, color: "white" }} />
            </Box>
            <Swiper
              slidesPerView={7}
              spaceBetween={30}
              centeredSlides={false}
              // pagination={{
              //   clickable: true,
              // }}
              className="restaurant_avatars_wrapper"
              navigation={{
                nextEl: ".restaurant-prev",
                prevEl: ".restaurant-next",
              }}
            >
              {randomRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    className={"restaurants_avatars"}
                    key={ele._id}
                  >
                    <img
                      style={{ width: "108px", height: "108px" }}
                      src={image_path}
                      alt=""
                    />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box className="next_btn restaurant-next ">
              <ArrowForward style={{ fontSize: 40, color: "white" }} />
            </Box>
          </Stack>

          <Stack
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "90%",
              marginTop: "65px",
            }}
          >
            <Box className="dishes_filter_box">
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "30px" }}
                onClick={() => searchOrderHandler("createdAt")}
              >
                new
              </Button>
              <Button
                onClick={() => searchOrderHandler("product_price")}
                variant="contained"
                color="secondary"
                style={{ marginRight: "30px" }}
              >
                prices
              </Button>
              <Button
                onClick={() => searchOrderHandler("product_likes")}
                variant="contained"
                color="secondary"
                style={{ marginRight: "30px" }}
              >
                likes
              </Button>
              <Button
                onClick={() => searchOrderHandler("product_views")}
                variant="contained"
                color="secondary"
              >
                views
              </Button>
            </Box>
          </Stack>
          <Stack className="dish_category_main_frame">
            <Stack className="dish_category_box">
              <div className="dish_category_frame">
                <Button
                  onClick={() => searchCollectionHandler("etc")}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  boshqa
                </Button>
                <Button
                  onClick={() => searchCollectionHandler("dessert")}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  dessert
                </Button>
                <Button
                  onClick={() => searchCollectionHandler("drink")}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  ichimlik
                </Button>
                <Button
                  onClick={() => searchCollectionHandler("salad")}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  salad
                </Button>
                <Button
                  onClick={() => searchCollectionHandler("dish")}
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  ovqatlar
                </Button>
              </div>
            </Stack>

            <Stack className="dish_wrapper">
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                const siz_volume =
                  product.product_collection === "drink"
                    ? product.product_volume + "l"
                    : product.product_size + " size";
                return (
                  <Box
                    onClick={() => chosenDishHandler(product?._id)}
                    className="dish_box"
                    key={product._id}
                    sx={{ cursor: "pointer" }}
                  >
                    <Stack
                      className="dish_img"
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                    >
                      <div className="dish_sale">{siz_volume}</div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="like_view_btn"
                        style={{ left: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_likes}
                          color="primary"
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button
                        className="view_btn"
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      >
                        <ShoppingCart style={{ display: "flex" }} />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="like_view_btn"
                        style={{ right: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <RemoveRedEye style={{ color: "white" }} />
                        </Badge>
                      </Button>
                    </Stack>
                    <Stack className={"dish_desc"}>
                      <span className={"dish_title_txt"}>
                        {product.product_name}
                      </span>
                      <span className={"dish_title_desc"}>
                        <MonetizationOn /> {product.product_price}
                      </span>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <div className="restaurant_reviews">
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box className="review_top_txt">Oshxona haqida fikrlar</Box>

          <Stack className="reviews_frame">
            {Array.from(Array(4).keys()).map((key, index) => {
              return (
                <Stack className="single_review" key={`${index}`}>
                  <Box className="reviewer_info">
                    <img src="/restaurant/burak.jpeg" alt="" />
                    <span>Chef Burak</span>
                    <div className="user_type">Foydalanuvchi</div>
                  </Box>
                  <Box className="review_desc">
                    <div>
                      Menga bu oshxonaning taomlari juda yoqadi. Hammaga tafsiya
                      qilaman!!!
                    </div>
                    <div>
                      <Star className="star_icon" />
                      <Star className="star_icon" />
                      <Star className="star_icon" />
                      <Star className="star_icon" />
                      <Star className="star_icon_white" />
                    </div>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Container>
      </div>
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          style={{ marginBottom: "60px" }}
        >
          <Box className="review_top_txt">Oshxona haqida</Box>
          <Stack
            style={{ marginTop: "70px" }}
            flexDirection={"row"}
            width={"90%"}
            // alignItems={"center"}
            // justifyContent={"space-between"}
          >
            <Box
              className="about_left"
              sx={{
                backgroundImage: `url(${serverApi}/${chosenRestaurant?.mb_image})`,
              }}
            >
              <span>{chosenRestaurant?.mb_nick}</span>
              <p>{chosenRestaurant?.mb_description}</p>
            </Box>
            {/* <Stack flexDirection={"row"} style={{ marginRight: "21px" }}>
              <Stack flexDirection={"column"}></Stack>
            </Stack> */}

            <Box className="about_right">
              {Array.from(Array(3).keys()).map((key, index) => {
                return (
                  <Stack
                    className="restaurant_desc"
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    key={`${index}`}
                  >
                    <img src="/restaurant/merhaba-steakhouse.jpg" alt="" />
                    <Box className="restaurant_desc_info">
                      <span>Bizning moxir oshpazlarimiz.</span>
                      <div>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh...
                      </div>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          </Stack>
        </Stack>
        <Stack className="iframe_container">
          <Box className="review_top_txt">Oshxona Manzili</Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.569811740135!2d69.30313167677262!3d41.252927704323604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae5f0136d64827%3A0x253490aa25a15247!2sMerhaba%20Steakhouse!5e0!3m2!1sen!2skr!4v1700439430993!5m2!1sen!2skr"
            width="1320"
            height="500"
            style={{ marginTop: "60px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
