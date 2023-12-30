import React, { useState, useEffect } from "react";
import { Person } from "@mui/icons-material";
import { Box, Button, Link, Stack } from "@mui/material";
import { Following } from "../../../types/follow";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowings } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

/** Redux Selector*/

const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

const followings = [
  { mb_nick: "abdulloh" },
  { mb_nick: "abdulrahmon" },
  { mb_nick: "maryam" },
];

export function MemberFollowings(props: any) {
  /** Initializations */
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);

  /** Handlers */
  return (
    <div className="member_followers">
      {followings.map((following) => {
        return (
          <Link style={{ textDecoration: "none", cursor: "pointer" }}>
            <Stack className="member_followers_container">
              <Stack className="member_follower_info">
                <Box className="follower_img">
                  <img src="/icons/author_default.jpeg" alt="" />
                </Box>
                <Stack className="member_follower_name">
                  <span>{following.mb_nick}</span>
                  <p>Ergashev Islombek</p>
                </Stack>
              </Stack>

              {props.actions_enabled && (
                <Box className="follow_btn">
                  <Button sx={{ background: "#E81010" }} variant="contained">
                    <Person sx={{ ml: "5px" }} />
                    Bekor Qilish
                  </Button>
                </Box>
              )}
            </Stack>
          </Link>
        );
      })}
    </div>
  );
}
