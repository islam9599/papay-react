import React, { useRef } from "react";
import { Box, Link, Stack } from "@mui/material";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import CheckBox from "@mui/material/Checkbox";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import moment from "moment";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { useHistory } from "react-router-dom";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

export function TargetArticles(props: any) {
  /** Initialization */
  const refs: any = useRef([]);
  const history = useHistory();
  const setArticleRebuild = props.setArticleRebuild;
  /** Handlers */
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "community",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticleRebuild(new Date());
    } catch (err: any) {
      console.log("err: targetLikeHandler", err);
      sweetErrorHandling(err).then();
    }
  };
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
                    onClick={targetLikeHandler}
                    icon={<FavoriteBorder style={{ color: "white" }} />}
                    id={article?._id}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    // onClick={}
                    checked={
                      article?.me_liked && article?.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
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
