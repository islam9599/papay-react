import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box, Checkbox, Link, Stack } from "@mui/material";
import React from "react";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import moment from "moment";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { verifiedMemberdata } from "../../apiServices/verify";

export function MemberPosts(props: any) {
  /** Initialization */
  const {
    setArticleRebuild,
    renderChosenArticlesHandeler,
    memberAticleSearchObj,
    chosenMemberBoArticles,
    setMemberAticleSearchObj,
  } = props;

  /** Handlers */
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberdata, Definer.auth_err1);

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
  const handlePaginationChange = (event: any, value: number) => {
    memberAticleSearchObj.page = value;
    setMemberAticleSearchObj({ ...memberAticleSearchObj });
  };
  return (
    <Stack
      style={{
        width: "100%",
        height: "700px",
        marginTop: "20px",
      }}
    >
      {chosenMemberBoArticles.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article?.art_image}`
          : "/auth/gallery.png";
        return (
          <Stack
            className="my_article_wrapper"
            onClick={() => renderChosenArticlesHandeler(article?._id)}
          >
            <Link className="target_articles_container">
              <Stack flexDirection={"row"}>
                <Box>
                  <img
                    className="user_img"
                    src={image_path}
                    alt="article_image"
                  />
                </Box>
                <Stack
                  flexDirection={"column"}
                  width={"90%"}
                  height={"auto"}
                  marginLeft={"15px"}
                  marginTop={"15px"}
                >
                  <Stack
                    className="author_info"
                    flexDirection={"row"}
                    alignItems={"center"}
                    sx={{ w: 40, h: 40 }}
                  >
                    <img
                      src={
                        article.member_data?.mb_image
                          ? `${serverApi}/${article.member_data?.mb_image}`
                          : "/icons/author_default.jpeg"
                      }
                      alt="member_image"
                    />
                    <span>{article.member_data?.mb_nick}</span>
                  </Stack>
                  <Box className="article_desc">
                    <p>{article?.bo_id}</p>
                    <span>{article?.art_subject}</span>
                  </Box>
                  <Stack className="article_date">
                    <p>{moment(article.createdAt).format("YY-MM-DD HH:mm")}</p>
                    <Checkbox
                      onClick={targetLikeHandler}
                      icon={<FavoriteBorder style={{ color: "white" }} />}
                      id={article?._id}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
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
          </Stack>
        );
      })}
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Pagination
          count={
            memberAticleSearchObj.page >= 3 ? memberAticleSearchObj.page + 1 : 3
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
      </Stack>
    </Stack>
  );
}
