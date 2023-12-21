import React, { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import MonetizationOn from "@mui/icons-material/MonetizationOn";
// Redux

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTrendProducts } from "./slice";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});
/** Redux Selector*/
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({
    trendProducts,
  })
);

export function BestDishes() {
  /** Initialization */
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  console.log("trendProducts::::::", trendProducts);

  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({ order: "product_likes", page: 1, limit: 4 })
      .then((data) => setTrendProducts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trendagi Ovqatlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            {trendProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              const size_volume =
                product.product_collection === "drink"
                  ? product.product_volume + "l"
                  : product.product_size + " size";
              return (
                <Box className="dish_box" key={product._id}>
                  <Stack
                    className="dish_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div className="dish_sale">{size_volume}</div>
                    <div className="view_btn">
                      Batafsil ko'rish
                      <img
                        src="/icons/arrow_right.svg"
                        alt=""
                        style={{ marginLeft: "9px" }}
                      />
                    </div>
                  </Stack>
                  <Stack className={"dish_desc"}>
                    <span className={"dish_title_txt"}>
                      {product.product_name}
                    </span>
                    <span className={"dish_title_desc"}>
                      <MonetizationOn />
                      {product.product_price}
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
      ;
    </div>
  );
}
