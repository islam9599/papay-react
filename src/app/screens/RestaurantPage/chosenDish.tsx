import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";
// import CheckBox from "@mui/material/CheckBox";

const chosen_list = Array.from(Array(3).keys());

export function ChosenDish() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
            {chosen_list.map((ele) => {
              const image_path = "/restaurant/boyin-food.jpeg";
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
            spaceBetween={5}
            slidesPerView={3}
            centeredSlides={false}
            className="mySwiper chosen_dish_swiper_second"
          >
            {Array.from(Array(5).keys()).map((ele) => {
              const img_path = `/restaurant/boyin-food.jpeg`;
              return (
                <SwiperSlide className="swiper_second_slider">
                  <img src={img_path} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className="chosen_dish_info_container">
          <Box className="chosen_dish_wrapper">
            <strong className="dish_txt">Juicy Steak</strong>
            <span className="resto_name">Hoji Bobo Restaurant</span>
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
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={true}
                  />
                  <span>98 ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEye style={{ marginRight: "10px" }} />
                  <span>1000 ta</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">O'zgacha ta'mli, special steak!!!</p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000"
            />
            <div className="dish_price_box">
              <span>Narxi</span>
              <span>$29</span>
            </div>
            <div className="btn_box">
              <Button variant="contained">Savatga qo’shish</Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
