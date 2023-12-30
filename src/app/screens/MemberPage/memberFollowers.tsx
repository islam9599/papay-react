import { Person } from "@mui/icons-material";
import { Box, Button, Link, Stack } from "@mui/material";
import React from "react";
import { Follower, Following } from "../../../types/follow";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowers } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers } from "./slice";

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

const followers = [
  { mb_nick: "@islam9995", following: true },
  { mb_nick: "@abu_abdulloh9507", following: false },
  { mb_nick: "@abu_maryam22", following: true },
  { mb_nick: "@abu_maryam22", following: false },
  { mb_nick: "@abu_maryam22", following: true },
  { mb_nick: "@abu_maryam22", following: false },
];
export function MemberFollowers(props: any) {
  /** Initializations */
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);

  /** Handlers */
  return (
    <div className="member_followers">
      {followers.map((follower) => {
        const img_path = "/icons/author_default.jpeg";
        return (
          <Link style={{ textDecoration: "none", cursor: "pointer" }}>
            <Stack className="member_followers_container">
              <Stack className="member_follower_info">
                <Box className="follower_img">
                  <img src={img_path} alt="" />
                </Box>
                <Stack className="member_follower_name">
                  <span>@islam9995</span>
                  <p>{follower.mb_nick}</p>
                </Stack>
              </Stack>
              {props.actions_enabled &&
                (follower.following ? (
                  <Box className="follow_btn">
                    <Button variant="contained">Following</Button>
                  </Box>
                ) : (
                  <Box className="follow_btn">
                    <Button
                      variant="contained"
                      sx={{ background: "#30945E", alignItems: "center" }}
                    >
                      <Person sx={{ mr: "5px" }} />
                      Follow
                    </Button>
                  </Box>
                ))}
            </Stack>
          </Link>
        );
      })}
    </div>
  );
}
