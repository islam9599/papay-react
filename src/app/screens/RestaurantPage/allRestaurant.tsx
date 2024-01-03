import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardOverflow,
  IconButton,
  AspectRatio,
  Link,
  CssVarsProvider,
} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box, Button, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Call, Favorite, LocationOnRounded, Search } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import assert from "assert";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Restaurant } from "../../../types/user";
import { retrieveTargetRestaurants } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "./slice";
import { verifiedMemberdata } from "../../apiServices/verify";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
});

/** Redux Selector*/
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);

export function AllRestaurants() {
  /** Initialization */
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
  const [targetSearchObj, setTargetSearchObj] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });
  const refs: any = useRef([]);
  const history = useHistory();

  useEffect(() => {
    // Todo: retrieve Restaurant data

    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants(targetSearchObj)
      .then((data) => {
        setTargetRestaurants(data);
      })
      .catch((err) => console.log(err));
  }, [targetSearchObj]);

  /** Handlers */
  const searchHandler = (category: string) => {
    targetSearchObj.page = 1;
    targetSearchObj.order = category;
    setTargetSearchObj({ ...targetSearchObj });
  };

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObj.page = value;
    setTargetSearchObj({ ...targetSearchObj });
  };
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberdata, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("err: targetLiketop", err);
      sweetErrorHandling(err).then();
    }
  };
  const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`);
  };

  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fit_search_box"}>
            <Box className={"fit_box"}>
              <a onClick={() => searchHandler("mb_point")}>Zo'r</a>
              <a onClick={() => searchHandler("mb_views")}>Mashhur</a>
              <a onClick={() => searchHandler("mb_likes")}>Trendagi</a>
              <a onClick={() => searchHandler("createdAt")}>Yangi</a>
            </Box>

            <Box className={"search_big_box"}>
              <form className={"search_form"} action="">
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
          <Stack className={"all_res_box"}>
            <CssVarsProvider>
              {targetRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <Card
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                      cursor: "pointer",
                    }}
                    key={ele._id}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={image_path} alt="" />
                      </AspectRatio>

                      <IconButton
                        aria-label="Like minimal phtography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
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
                        <Favorite
                          onClick={(e) => targetLikeHandler(e, ele._id)}
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                      {ele.mb_nick} Restaurant
                    </Typography>
                    <span
                      style={{
                        width: "200px",
                        marginTop: 0.5,
                        marginBottom: 2,
                      }}
                    >
                      <Link
                        href=""
                        startDecorator={<LocationOnRounded />}
                        textColor={"rgba(56, 55, 55, 0.90);"}
                      >
                        {ele.mb_address}
                      </Link>
                    </span>
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
                        <div
                          ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className="bottom_box">
            <img
              className="line_img_left"
              src={"/icons/line_group.svg"}
              alt=""
            />
            <Pagination
              count={targetSearchObj.page >= 3 ? targetSearchObj.page + 1 : 3}
              page={targetSearchObj.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={handlePaginationChange}
            />

            <img
              className="line_img_right"
              src={"/icons/line_group.svg"}
              alt=""
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
