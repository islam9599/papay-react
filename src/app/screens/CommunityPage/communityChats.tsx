import React, { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import Marginer from "../../components/marginer";
import Send from "@mui/icons-material/Send";

export function CommunityChats() {
  useEffect(() => {
    console.log("Community page!!!");
  }, []);
  return (
    <div className="communityCharts_container">
      <Stack flexDirection={"column"}>
        <Box className="chat_title">
          <span>Jonli Muloqot</span>
        </Box>
        <Marginer
          direction="horizontal"
          width="381"
          height="1"
          bg="rgba(228, 228, 228, 0.83);"
        />
        <Stack className="users_chats_wrapper" flexDirection={"column"}>
          {Array.from(Array(10).keys()).map(() => {
            return (
              <div>
                <Box className="other_user">
                  <img src="/icons/author_default.svg" alt="" />
                  <div className="user_txt_wrapper">
                    <p>Hammaga assalomu alaykum!</p>
                  </div>
                </Box>
                <Box className="auth_user">
                  <div>
                    <p>Va alaykum assalomu</p>
                  </div>
                </Box>
              </div>
            );
          })}
        </Stack>
        <Marginer
          direction="horizontal"
          width="381"
          height="1"
          bg="rgba(228, 228, 228, 0.83);"
        />
        <Stack className="chat_bott">
          <input
            type="text"
            name="message"
            className="msg_input"
            placeholder="Xabar jo’natish"
          />
          <button>
            <Send style={{ color: "#fff" }} />
          </button>
        </Stack>
      </Stack>
    </div>
  );
}
