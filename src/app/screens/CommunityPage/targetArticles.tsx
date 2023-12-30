import React from "react";
import { Box, Link, Stack } from "@mui/material";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import CheckBox from "@mui/material/Checkbox";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import moment from "moment";

export function TargetArticles(props: any) {
  return (
    <Stack>
      {props.targetBoArticles.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/icons/author_default.jpeg";
        const auth_image = article?.member_data?.mb_image
          ? `${serverApi}/${article?.member_data.mb_image}`
          : "/auth/author_default.jpeg";

        return (
          <Link key={article._id} className="target_articles_container">
            <Stack flexDirection={"row"}>
              <Box
                className="user_img"
                // sx={{ backgroundImage: `url(${art_image_url})` }}
              >
                <img src={art_image_url} alt="" />
              </Box>
              <Stack
                flexDirection={"column"}
                width={"90%"}
                height={"auto"}
                marginLeft={"15px"}
                marginTop={"15px"}
              >
                <Box className="author_info">
                  <img src={auth_image} alt="" />
                  <span>{article?.member_data?.mb_nick}</span>
                </Box>
                <Box className="article_desc">
                  <span>{article?.bo_id}</span>
                </Box>
                <Box sx={{ color: "#fff" }}>
                  <span>{article?.art_subject}</span>
                </Box>

                <Stack className="article_date">
                  <p>{moment(article.createdAt).format("YY-MM-DD HH:mm")}</p>
                  <CheckBox
                    icon={<FavoriteBorder style={{ color: "white" }} />}
                    id={article?._id}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    // onClick={}
                    checked={false}
                  />

                  <p>{article?.art_likes}</p>
                  <RemoveRedEye />
                  <p>{article?.art_views}</p>
                </Stack>
              </Stack>
            </Stack>
          </Link>
        );
      })}
    </Stack>
  );
}
