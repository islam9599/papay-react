import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import {
  Card,
  CardOverflow,
  Typography,
  IconButton,
  AspectRatio,
  Link,
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy";
import { Favorite, LocationOnRounded, Call } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Redux

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";
import { serviceApi } from "../../../lib/config";

/** Redux Selector*/
const bestRestaurantRetriever = createSelector(
  retrieveBestRestaurants,
  (bestRestaurants) => ({
    bestRestaurants,
  })
);
console.log("bestRestaurantRetriever:::", bestRestaurantRetriever);

export function BestRestaurants() {
  /** Initialization */
  const { bestRestaurants } = useSelector(bestRestaurantRetriever);
  console.log("bestRestaurants:::", bestRestaurants);
  return (
    <div className="best_restaurant_frame">
      <img
        src={"icons/line_group.svg"}
        alt=""
        style={{ position: "absolute", left: "6%" }}
      />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box sx={{ mb: "43px" }} className="category_title">
            Zo’r Restaurantlar
          </Box>
          <Stack flexDirection={"row"}>
            {bestRestaurants.map((ele: Restaurant) => {
              const image_path = `${serviceApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider>
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 483,
                      minWidth: 320,
                      mr: "35px",
                      cursor: "pointer",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={image_path} loading="lazy" alt="" />
                      </AspectRatio>

                      <IconButton
                        aria-label="Like animal phtography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite style={{ color: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                      {ele.mb_nick} Restaurant
                    </Typography>
                    <Typography textColor="neutral.300">
                      <Link
                        href=""
                        startDecorator={<LocationOnRounded />}
                        textColor={"rgba(56, 55, 55, 0.90);"}
                      >
                        {ele.mb_address}
                      </Link>
                    </Typography>
                    <Typography textColor="neutral.300">
                      <Link
                        href=""
                        startDecorator={<Call />}
                        textColor={"rgba(56, 55, 55, 0.90);"}
                      >
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "md",
                          color: "rgba(56, 55, 55, 0.90);",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {ele.mb_views}
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                      <Typography
                        sx={{
                          fontSize: "md",
                          color: "rgba(56, 55, 55, 0.90);",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div>{ele.mb_likes}</div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Button style={{ background: "#1976D2", color: "#fff" }}>
              BARCHASINI KO’RISH
            </Button>
          </Stack>
        </Stack>
      </Container>
      ;
    </div>
  );
}
