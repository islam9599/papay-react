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
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";

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
    useState<SearchMemberArticleObj>({ page: 1, limit: 3, mb_id: "none" });

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
  }, [memberAticleSearchObj, articleRebuild]);

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
        .then((data) => setChosenSingleBoArticle(data))
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
        <Stack width={"100%"} height={"750px"} flexDirection={"row"}>
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
                    />
                    <Pagination
                      count={
                        memberAticleSearchObj.page >= 3
                          ? memberAticleSearchObj.page + 1
                          : 3
                      }
                      page={memberAticleSearchObj.page}
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                          }}
                          {...item}
                          color="secondary"
                          sx={{ mt: 5 }}
                        />
                      )}
                      onChange={handlePaginationChange}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MemberFollowers actions_enabled={true} />
                    <Pagination
                      count={
                        memberAticleSearchObj.page >= 3
                          ? memberAticleSearchObj.page + 1
                          : 3
                      }
                      page={memberAticleSearchObj.page}
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
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MemberFollowings actions_enabled={true} />
                    <Pagination
                      count={
                        memberAticleSearchObj.page >= 3
                          ? memberAticleSearchObj.page + 1
                          : 3
                      }
                      page={memberAticleSearchObj.page}
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
                    <TViewer text={`<h1>Assalomu alaykum</h1>`} />
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
                    <img src="/icons/author_default.jpeg" alt="" />
                  </div>
                  <div>
                    <img
                      className="auth_user_avatar"
                      src="/icons/author_default.jpeg"
                      alt=""
                    />
                  </div>
                </Box>
                <Box className="auth_user_name">
                  <span>Ergashev Islombek</span>
                  <span>Foydalanuvchi</span>
                </Box>
                <Stack
                  flexDirection={"row"}
                  width={"130px"}
                  height={"20px"}
                  justifyContent={"space-between"}
                  marginTop={"10px"}
                >
                  <Facebook />
                  <Instagram />
                  <YouTube />
                  <Telegram />
                </Stack>
                <Box className="auth_follow">
                  <span>Followers: 2</span>
                  <span>Following: 3</span>
                </Box>
                <p>Assalomu Alaykum!</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Button onClick={() => setValue("4")} variant="contained">
                      MAQOLA YOZISH
                    </Button>
                  </TabList>
                </Box>
              </Stack>

              <Stack className="my_page_menu">
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
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
                </TabList>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
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
                </TabList>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
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
