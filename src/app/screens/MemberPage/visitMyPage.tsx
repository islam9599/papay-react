import React, { useState } from "react";
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

export function VisitMyPage(props: any) {
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
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
                    <MemberPosts />
                    <Pagination
                      style={{ marginTop: "50px" }}
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
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MemberFollowers actions_enabled={true} />
                    <Pagination
                      style={{ marginTop: "50px" }}
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
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Marginer width="750px" bg="#fff" height="1" />
                  <Box className="menu_content">
                    <MemberFollowings actions_enabled={true} />
                    <Pagination
                      style={{ marginTop: "50px", marginBottom: "50px" }}
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
