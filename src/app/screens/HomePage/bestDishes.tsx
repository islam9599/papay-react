import React from "react";
import { Box, Container, Stack } from "@mui/material";
import MonetizationOn from "@mui/icons-material/MonetizationOn";

export function BestDishes() {
  return (
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Trendagi Ovqatlar</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/9f/81/caption.jpg?w=600&h=-1&s=1)`,
                }}
              >
                <div className="dish_sale">normal size</div>
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
                <span className={"dish_title_txt"}>Stack Set</span>
                <span className={"dish_title_desc"}>
                  <MonetizationOn />
                  159
                </span>
              </Stack>
            </Box>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/9f/81/caption.jpg?w=600&h=-1&s=1)`,
                }}
              >
                <div className="dish_sale">normal size</div>
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
                <span className={"dish_title_txt"}>Stack Set</span>
                <span className={"dish_title_desc"}>
                  <MonetizationOn />
                  159
                </span>
              </Stack>
            </Box>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/9f/81/caption.jpg?w=600&h=-1&s=1)`,
                }}
              >
                <div className="dish_sale">normal size</div>
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
                <span className={"dish_title_txt"}>Stack Set</span>
                <span className={"dish_title_desc"}>
                  <MonetizationOn />
                  159
                </span>
              </Stack>
            </Box>
            <Box className="dish_box">
              <Stack
                className="dish_img"
                sx={{
                  backgroundImage: `url(https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/9f/81/caption.jpg?w=600&h=-1&s=1)`,
                }}
              >
                <div className="dish_sale">normal size</div>
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
                <span className={"dish_title_txt"}>Stack Set</span>
                <span className={"dish_title_desc"}>
                  <MonetizationOn />
                  159
                </span>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
      ;
    </div>
  );
}
