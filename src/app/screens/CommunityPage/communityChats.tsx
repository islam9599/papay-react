import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Container, Stack } from "@mui/material";
import Marginer from "../../components/marginer";
import Send from "@mui/icons-material/Send";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import { verifiedMemberdata } from "../../apiServices/verify";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { RippleBadge } from "../../MaterialTheme/styled";

const NewMessage = (data: any) => {
  if (data.new_message.mb_id == verifiedMemberdata?.mb_id) {
    return (
      <Box className="auth_user">
        <div>
          <p>{data.new_message.msg}</p>
        </div>
      </Box>
    );
  } else {
    return (
      <Box className="other_user">
        <img
          src={
            data?.new_message?.mb_image
              ? data?.new_message?.mb_image
              : "/auth/author_default.jpeg"
          }
          alt={data?.new_message?.mb_nick}
        />
        <div className="user_txt_wrapper">
          <p>{data.new_message.msg}</p>
        </div>
      </Box>
    );
  }
};

export function CommunityChats() {
  /** Initializations */
  const textInput: any = useRef(null);
  const [messagesList, setMessagesList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.connect();
    console.log("Community page!!!");

    socket?.on("connect", () => {
      console.log("Client, connected");
    });

    socket.on("newMsg", (new_message: ChatMessage) => {
      console.log("Client, newMsg");

      messagesList.push(
        // @ts-ignore
        <NewMessage new_message={new_message} key={messagesList.length} />
      );
      setMessagesList([...messagesList]);
    });

    socket.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("Client, greetMsg");

      messagesList.push(
        // @ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberdata?.mb_nick ?? "guest"}!
        </p>
      );
      setMessagesList([...messagesList]);
    });
    socket.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("Client, infoMsg");

      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** Handlers */
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key == "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err) {
      console.log("getKeyHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberdata) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", true);
        return false;
      }
      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);
      const mb_image_url = verifiedMemberdata?.mb_image
        ? verifiedMemberdata?.mb_image
        : "/auth/default_author.jpeg";
      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberdata?.mb_id,
        mb_nick: verifiedMemberdata?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
      // Clean input
      // Send msg
    } catch (err: any) {
      console.log("onClickHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="communityCharts_container">
      <Stack flexDirection={"column"}>
        <Box className="chat_title">
          <div>Jonli Muloqot </div>
          <RippleBadge
            style={{
              margin: "-30px 0 0 20px",
            }}
            badgeContent={onlineUsers}
          />
        </Box>
        <Marginer
          direction="horizontal"
          width="381"
          height="1"
          bg="rgba(228, 228, 228, 0.83);"
        />
        <Stack className="users_chats_wrapper" flexDirection={"column"}>
          <Box className="other_user">
            <div className="user_txt_wrapper">
              <p>Bu yer jonli muloqot</p>
            </div>
          </Box>
          {messagesList}
        </Stack>
        <Marginer
          direction="horizontal"
          width="381"
          height="1"
          bg="rgba(228, 228, 228, 0.83);"
        />
        <Stack className="chat_bott">
          <input
            ref={textInput}
            onChange={getInputMessageHandler}
            onKeyDown={getKeyHandler}
            type="text"
            name="message"
            className="msg_input"
            placeholder="Xabar jo’natish"
          />
          <button onClick={onClickHandler}>
            <Send style={{ color: "#fff" }} />
          </button>
        </Stack>
      </Stack>
    </div>
  );
}
