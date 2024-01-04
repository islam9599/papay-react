import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Marginer from "../../components/marginer";
import Send from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";

export function CommunityChats() {
  /** Initializations */
  const [messagesList, setMessagesList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);

  useEffect(() => {
    socket.connect();
    console.log("Community page!!!");

    socket?.on("connect", () => {
      console.log("Client, connected");
    });

    socket.on("newMsg", (new_message: any) => {
      console.log("Client, newMsg");
    });
    socket.on("greetMsg", (new_message: any) => {
      console.log("Client, greetMsg");
    });
    socket.on("infoMsg", (msg: any) => {
      console.log("Client, infoMsg");

      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** Handlers */

  return (
    <div className="communityCharts_container">
      <Stack flexDirection={"column"}>
        <Box className="chat_title">
          <span>Jonli Muloqot {onlineUsers} </span>
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
