import React, { useState } from "react";
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

const targetBoArticles = [1, 2, 3, 4, 5];

export function CommunityPage() {
  /** Initializations */
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  /** Handlers */
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
                      <TargetArticles
                        targetBoArticles={[1, 2, 3, 4, 5, 6, 7]}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <TargetArticles targetBoArticles={[1, 2, 3]} />
                    </TabPanel>
                    <TabPanel value="3">
                      <TargetArticles targetBoArticles={[1, 2]} />
                    </TabPanel>
                    <TabPanel value="4">
                      <TargetArticles targetBoArticles={[1, 2]} />
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
                    count={3}
                    page={1}
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
                </Stack>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
