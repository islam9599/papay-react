import { Favorite, RemoveRedEye } from "@mui/icons-material";
import { Box, Link, Stack } from "@mui/material";
import React from "react";

export function MemberPosts(props: any) {
  return (
    <Stack
      style={{
        overflow: "scroll",
        width: "100%",
        height: "400px",
      }}
    >
      {" "}
      {Array.from(Array(2).keys()).map(() => {
        return (
          <Stack className="my_article_wrapper">
            <Link className="target_articles_container">
              <Stack flexDirection={"row"}>
                <Box>
                  <img
                    className="user_img"
                    src="/icons/author_default.jpeg"
                    alt=""
                  />
                </Box>
                <Stack
                  flexDirection={"column"}
                  width={"90%"}
                  height={"auto"}
                  marginLeft={"15px"}
                  marginTop={"15px"}
                >
                  <Box className="author_info">
                    <img src="/icons/author_default.svg" alt="" />
                    <span>@nurse</span>
                  </Box>
                  <Box className="article_desc">
                    <span>Kebuli Rice with tomatoes s...</span>
                  </Box>
                  <Stack className="article_date">
                    <p>23-11-23 19:46</p>
                    <Favorite />
                    <p>1</p>
                    <RemoveRedEye />
                    <p>2</p>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
          </Stack>
        );
      })}
    </Stack>
  );
}