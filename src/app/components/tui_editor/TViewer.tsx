import React, { useEffect, useRef, useState } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Box, Stack } from "@mui/material";

export function TViewer(props: any) {
  const editorRef = useRef();
  return (
    <Stack sx={{ background: "#fff", mt: "30px", borderRadius: "10px" }}>
      <Box sx={{ m: "40px" }}>
        <Viewer
          // @ts-ignore
          ref={editorRef}
          initialValue={props.text}
          height={"400px"}
        />
      </Box>
    </Stack>
  );
}
