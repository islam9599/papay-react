import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Button } from "@mui/material";
import {
  Facebook,
  Instagram,
  Telegram,
  YouTube,
  Settings,
  Edit,
  Group,
  Person,
} from "@mui/icons-material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MemberFollowers } from "./memberFollowers";
import Marginer from "../../components/marginer";

import { MemberFollowings } from "./memberFollowings";
import { MemberPosts } from "./memberPosts";
import { MySettings } from "./mySettings";
import { TuiEditor } from "../../components/tui_editor";
import { TViewer } from "../../components/tui_editor/TViewer";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticleObj } from "../../../types/boArticle";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { serverApi } from "../../../lib/config";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});

/** Redux Selector*/
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);

const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);

const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);

export function VisitMyPage(props: any) {
  /** Initializations */
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const { verifiedMemberdata } = props;
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = useState("1");

  const [memberAticleSearchObj, setMemberAticleSearchObj] =
    useState<SearchMemberArticleObj>({
      page: 1,
      limit: 3,
      mb_id: "none" || verifiedMemberdata?.mb_id,
    });

  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("member_data")) {
      sweetFailureProvider("Please login first!!!", true, true);
    }

    const communityService = new CommunityApiService();
    communityService
      .getMemberCommunityArticle(memberAticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));

    const memberService = new MemberApiService();
    memberService
      .getChosenMember(verifiedMemberdata?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberAticleSearchObj, articleRebuild, followRebuild]);

  /** Handlers */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberAticleSearchObj.page = value;
    setMemberAticleSearchObj({ ...memberAticleSearchObj });
  };

  const renderChosenArticlesHandeler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="my_page">
      <Container
        // maxWidth="lg"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <Stack width={"100%"} height={"800px"} flexDirection={"row"}>
          <TabContext value={value}>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">Mening Maqolalarim</Box>
                  <Marginer width="750px" bg="#fff" height="1" />

                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticlesHandeler={
                        renderChosenArticlesHandeler
                      }
                      setArticleRebuild={setArticleRebuild}
                      memberAticleSearchObj={memberAticleSearchObj}
                      setMemberAticleSearchObj={setMemberAticleSearchObj}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={true}
                      mb_id={verifiedMemberdata?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MemberFollowings
                      actions_enabled={true}
                      mb_id={verifiedMemberdata?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box className="menu_name">Maqola yozish</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content" sx={{ height: "1200px" }}>
                    <TuiEditor />
                  </Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box className="menu_name">Tanlangan Maqola</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
                <TabPanel value="6">
                  <Box className="menu_name">Ma'lumotlarni o'zgartirish</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MySettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
            <Stack className="my_page_right">
              <Stack className="order_info_box">
                <a onClick={() => setValue("6")}>
                  <Settings />
                </a>
                <Box className="auth_user_img">
                  <div>
                    <img
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/auth/author_default.jpeg"
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      className="auth_user_avatar"
                      src={
                        chosenMember?.mb_type === "RESTAURANT"
                          ? "/icons/restaurant_type.webp"
                          : "/icons/author_default.jpeg"
                      }
                      alt="mb_type"
                    />
                  </div>
                </Box>
                <Box className="auth_user_name">
                  <span>{chosenMember?.mb_nick}</span>
                  <span>{chosenMember?.mb_type ?? "Foydalanuvchi"}</span>
                </Box>
                <Stack
                  flexDirection={"row"}
                  width={"130px"}
                  height={"20px"}
                  justifyContent={"space-between"}
                  marginTop={"10px"}
                >
                  <Facebook sx={{ color: "blue" }} />
                  <Instagram href="" sx={{ color: "red" }} />
                  <YouTube sx={{ color: "red" }} />
                  <Telegram sx={{ color: "blue" }} />
                </Stack>
                <Box className="auth_follow">
                  <span>Followers: {chosenMember?.mb_subscriber_cnt}</span>
                  <span>Followings: {chosenMember?.mb_follow_cnt}</span>
                </Box>
                <p>
                  {chosenMember?.mb_description
                    ? chosenMember.mb_description
                    : "Qoshimcha ma'lumot kiritilmagan!"}
                </p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="aria-lab tabs example"
                  >
                    <Button
                      value={"4"}
                      onClick={() => setValue("4")}
                      variant="contained"
                    >
                      MAQOLA YOZISH
                    </Button>
                  </TabList>
                </Box>
              </Stack>

              <Stack className="my_page_menu">
                <TabList
                  orientation="vertical"
                  variant="scrollable"
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 2, borderColor: "divider", width: "98%" }}
                >
                  <Tab
                    sx={{ flexDirection: "column" }}
                    value={"1"}
                    TabIndicatorProps={{
                      style: { transition: "none" },
                    }}
                    component={(e) => {
                      return (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("1")}
                        >
                          <Edit className="menu_box_edit" />
                          <span>Maqolalarim</span>
                        </div>
                      );
                    }}
                  />
                  <Tab
                    sx={{ flexDirection: "column" }}
                    value={"2"}
                    component={(e) => {
                      return (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("2")}
                        >
                          <Group className="menu_box_edit" />
                          <span>Followers</span>
                        </div>
                      );
                    }}
                  />
                  <Tab
                    sx={{ flexDirection: "column" }}
                    value={"3"}
                    component={(e) => {
                      return (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("3")}
                        >
                          <Person />
                          <span>Followings</span>
                        </div>
                      );
                    }}
                  />
                </TabList>
              </Stack>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
