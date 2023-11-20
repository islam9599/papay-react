import React, { useState } from "react";

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

const restaurant_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(8).keys());

export function OneRestaurant() {
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
              pagination={{
                clickable: true,
              }}
              className="restaurant_avatars_wrapper"
              navigation={{
                nextEl: ".restaurant-prev",
                prevEl: ".restaurant-next",
              }}
            >
              {restaurant_list.map((ele, index) => {
                return (
                  <SwiperSlide
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className={"restaurants_avatars"}
                    key={index}
                  >
                    <img
                      style={{ width: "108px", height: "108px" }}
                      src="/restaurant/burak.jpeg"
                      alt=""
                    />
                    <span>Burak</span>
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
              >
                new
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "30px" }}
              >
                prices
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "30px" }}
              >
                likes
              </Button>
              <Button variant="contained" color="secondary">
                views
              </Button>
            </Box>
          </Stack>
          <Stack className="dish_category_main_frame">
            <Stack className="dish_category_box">
              <div className="dish_category_frame">
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  boshqa
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  dessert
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  ichimlik
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  salad
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: "30px" }}
                >
                  ovqatlar
                </Button>
              </div>
            </Stack>

            <Stack className="dish_wrapper">
              {product_list.map((key, index) => {
                const siz_volume = "normal size";
                return (
                  <Box className="dish_box" key={`${index}`}>
                    <Stack
                      className="dish_img"
                      sx={{
                        backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/9f/81/caption.jpg?w=600&h=-1&s=1)`,
                      }}
                    >
                      <div className="dish_sale">{siz_volume}</div>
                      <Button
                        className="like_view_btn"
                        style={{ left: "36px" }}
                      >
                        <Badge badgeContent={8} color="primary">
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={`${index}`}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            checked={true}
                          />
                        </Badge>
                      </Button>
                      <Button className="view_btn">
                        <ShoppingCart style={{ display: "flex" }} />
                      </Button>
                      <Button
                        className="like_view_btn"
                        style={{ right: "36px" }}
                      >
                        <Badge badgeContent={1000} color="primary">
                          <Checkbox
                            icon={<RemoveRedEye style={{ color: "white" }} />}
                          />
                        </Badge>
                      </Button>
                    </Stack>
                    <Stack className={"dish_desc"}>
                      <span className={"dish_title_txt"}>Stack Set</span>
                      <span className={"dish_title_desc"}>
                        <MonetizationOn />
                        159
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
            <Box className="about_left">
              <span>Rayhon.</span>
              <p>
                Biz sizlarga xizmat ko’rsatayotganimizdan bag’oyatda xursadmiz.
                Bizning xaqimizda: O’z faoliyatimizni 1945 - yilda boshlaganmiz
                vaxokazo vaxokazo vaxokazo...
              </p>
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
