import React from "react";
import { Avatar, Box, Container, Stack } from "@mui/material";

export function Recommendations() {
  return (
    <div className="top_article_frame">
      <Container
        className={"top_article_frame_container"}
        // sx={{ mt: "60px", mb: "50px", position: "relative" }}
        maxWidth="lg"
      >
        <Stack
          className={"article_main_wrapper"}
          // flexDirection={"column"}
          // alignItems={"center"}
          // sx={{ mt: "45px" }}
        >
          <Box className="category_title">Tavsiya qilingan maqolalar</Box>
          <Stack className={"article_main"}>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Ko'p ko'rilgan</Box>

              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/19/a4/09/88/merhaba-steakhouse.jpg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className="article_author">
                      <Avatar
                        alt="author-photo"
                        src={"icons/author_default.jpeg"}
                        sx={{ width: "35px", height: "35px" }}
                      />

                      <span className="author_username">Little</span>
                    </div>
                    <span className="article_title">
                      Eng mazzali va shirin taomlar
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>

              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/19/a4/09/88/merhaba-steakhouse.jpg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className="article_author">
                      <Avatar
                        alt="author-photo"
                        src={"icons/author_default.jpeg"}
                        sx={{ width: "35px", height: "35px" }}
                      />

                      <span className="author_username">Little</span>
                    </div>
                    <span className="article_title">
                      Eng mazzali va shirin taomlar
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>
              <Box className={"article_category"}>Ko'p yoqtirilgan</Box>

              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/19/a4/09/88/merhaba-steakhouse.jpg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className="article_author">
                      <Avatar
                        alt="author-photo"
                        src={"icons/author_default.jpeg"}
                        sx={{ width: "35px", height: "35px" }}
                      />

                      <span className="author_username">David</span>
                    </div>
                    <span className="article_title">
                      O'zgacha ta'mli va halol Steaklar!
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>

              <Stack className={"article_box"}>
                <Box
                  className={"article_img"}
                  sx={{
                    backgroundImage: `url(https://media-cdn.tripadvisor.com/media/photo-s/19/a4/09/88/merhaba-steakhouse.jpg)`,
                  }}
                ></Box>
                <Box className={"article_info"}>
                  <Box className={"article_main_info"}>
                    <div className="article_author">
                      <Avatar
                        alt="author-photo"
                        src={"icons/author_default.jpeg"}
                        sx={{ width: "35px", height: "35px" }}
                      />

                      <span className="author_username">David</span>
                    </div>
                    <span className="article_title">
                      O'zgacha ta'mli va halol Steaklar!
                    </span>
                    <p className="article_desc"></p>
                  </Box>
                </Box>
              </Stack>
            </Stack>

            <Stack className={"article_container"}>
              <Box className={"article_category"}>Mashhurlar</Box>
              <Box className={"article_news"}>
                <h1 style={{ color: "orange" }}>TViewer</h1>
              </Box>
              <Box className={"article_news"}>
                <h1 style={{ color: "orange" }}>TViewer</h1>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      ;
    </div>
  );
}
