import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Stack } from "@mui/material";

export function TViewer(props: any) {
  const editorRef = useRef();
  return (
    <Stack
      sx={{
        width: "800px",
        height: "800px",
        background: "#fff",
        mt: "30px",
        borderRadius: "10px",
        overflow: "scroll",
      }}
    >
      <Box sx={{ m: "40px" }}>
        <Viewer
          // @ts-ignore
          ref={editorRef}
          initialValue={props.chosenSingleBoArticle?.art_content}
          height={"400px"}
        />
      </Box>
    </Stack>
  );
}
