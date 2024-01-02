import { Person } from "@mui/icons-material";
import { Box, Button, Link, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FollowSearchObj, Follower } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowers } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "./slice";
import { useHistory } from "react-router-dom";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

/** Redux Selector*/
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

export function MemberFollowers(props: any) {
  /** Initializations */
  const { mb_id, setFollowRebuild, followRebuild } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
    { page: 1, limit: 5, mb_id: mb_id }
  );
  const history = useHistory();

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSearchObj, followRebuild]);
  // setMemberFollowers

  /** Handlers */
  const handlePaginationChange = (event: any, value: number) => {
    followersSearchObj.page = value;
    setFollowersSearchObj({ ...followersSearchObj });
  };
  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.subscribe(id);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log("ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <div className="member_followers">
      {memberFollowers.map((follower: Follower) => {
        const img_path = follower.subscriber_member_data?.mb_image
          ? `${serverApi}/${follower?.subscriber_member_data?.mb_image}`
          : "/icons/author_default.jpeg";
        return (
          <Link
            style={{
              textDecoration: "none",

              overflowY: "scroll",
            }}
            key={follower._id}
          >
            <Stack className="member_followers_container">
              <Stack className="member_follower_info">
                <Box className="follower_img">
                  <img
                    style={{ cursor: "pointer" }}
                    src={img_path}
                    alt=""
                    onClick={() => visitMemberHandler(follower?.subscriber_id)}
                  />
                </Box>
                <Stack className="member_follower_name">
                  <span>
                    {follower?.subscriber_member_data?.mb_type ?? "USER"}
                  </span>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => visitMemberHandler(follower?.subscriber_id)}
                  >
                    {follower?.subscriber_member_data?.mb_nick}
                  </p>
                </Stack>
              </Stack>
              {props.actions_enabled &&
                (follower.me_followed &&
                follower?.me_followed[0]?.my_following ? (
                  <Box className="follow_btn">
                    <Button variant="contained">Following</Button>
                  </Box>
                ) : (
                  <Box className="follow_btn">
                    <Button
                      onClick={(e) =>
                        subscribeHandler(e, follower?.subscriber_id)
                      }
                      variant="contained"
                      sx={{ background: "#30945E", alignItems: "center" }}
                    >
                      <Person sx={{ mr: "5px" }} />
                      Follow Back
                    </Button>
                  </Box>
                ))}
            </Stack>
          </Link>
        );
      })}
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Pagination
          count={followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3}
          page={followersSearchObj.page}
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
    </div>
  );
}
