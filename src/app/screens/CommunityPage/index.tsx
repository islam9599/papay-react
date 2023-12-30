import React, { useState, useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/community.css";
import { CommunityChats } from "./communityChats";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Marginer from "../../components/marginer";
import { TargetArticles } from "./targetArticles";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticleObj } from "../../../types/boArticle";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetboArticles } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetboArticles } from "./slice";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTargetboArticles: (data: BoArticle[]) =>
    dispatch(setTargetboArticles(data)),
});

/** Redux Selector*/
const targetboArticlesRetriever = createSelector(
  retrieveTargetboArticles,
  (targetboArticles) => ({
    targetboArticles,
  })
);

export function CommunityPage() {
  /** Initializations */
  const { setTargetboArticles } = actionDispatch(useDispatch());
  const { targetboArticles } = useSelector(targetboArticlesRetriever);
  const [value, setValue] = useState("1");
  const [searchArticlesObj, setSearchArticleObj] = useState<SearchArticleObj>({
    bo_id: "all",
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticle(searchArticlesObj)
      .then((data) => setTargetboArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj]);

  /** Handlers */
  const handleChange = (event: any, newValue: string) => {
    searchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticleObj({ ...searchArticlesObj });
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticleObj({ ...searchArticlesObj });
  };

  return (
    <div className="community_page">
      <div
        style={{
          display: "flex",
          // flexDirection: "row",
          // alignItems: "center",
          // justifyContent: "space-between",
          width: "100%",
          height: "auto",
        }}
      >
        <Container>
          <Stack className="community_page_wrapper">
            <CommunityChats />
            <Stack className="tab_main_wrapper">
              <TabContext value={value}>
                <Box className="order_nav_frame">
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "100%",
                      }}
                      variant="fullWidth"
                    >
                      <Tab label="BARCHA MAQOLALAR" value="1" />
                      <Tab label="MASHXURLAR" value="2" />
                      <Tab label="OSHXONAGA BAHO" value="3" />
                      <Tab label="HIKOYALAR" value="4" />
                    </TabList>
                  </Box>
                </Box>
                <Stack
                  className="tabpanel_wrapper"
                  style={{ width: "100%", height: "980px", marginTop: "15px" }}
                >
                  <Marginer
                    width="863"
                    height="1"
                    bg="rgba(228, 228, 228, 0.83)"
                  />
                  <Stack className="main_article">
                    <TabPanel value="1">
                      <TargetArticles targetBoArticles={targetboArticles} />
                    </TabPanel>
                    <TabPanel value="2">
                      <TargetArticles targetBoArticles={targetboArticles} />
                    </TabPanel>
                    <TabPanel value="3">
                      <TargetArticles targetBoArticles={targetboArticles} />
                    </TabPanel>
                    <TabPanel value="4">
                      <TargetArticles targetBoArticles={targetboArticles} />
                    </TabPanel>
                  </Stack>
                </Stack>
                <Marginer
                  width="863"
                  height="1"
                  bg="rgba(228, 228, 228, 0.83)"
                />
                <Stack className="aricle_pagination" spacing={4}>
                  <Pagination
                    count={
                      searchArticlesObj.page >= 3
                        ? searchArticlesObj.page + 1
                        : 3
                    }
                    page={searchArticlesObj.page}
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
                </Stack>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
