import React, { useState, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
  Container,
  Stack,
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";

export function TuiEditor(props: any) {
  const editorRef = useRef();

  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin: "40px" }}
        justifyContent={"space-evenly"}
      >
        <Box className="form_row" sx={{ width: "300px", mr: "20px" }}>
          <Typography style={{ color: " #E1FFE9", margin: "10px" }}>
            Category
          </Typography>
          <FormControl
            sx={{ width: "100%", background: "#fff", borderRadius: "10px" }}
          >
            <Select
              value={"celebrity"}
              displayEmpty
              inputProps={{ "aria-label": "without label" }}
            >
              <MenuItem value="">
                <span>Kategoriyani tanlang</span>
              </MenuItem>
              <MenuItem value={"celebrity"}>Mashhurlar</MenuItem>
              <MenuItem value={"celebrity"}>Restaurantga baho</MenuItem>
              <MenuItem value={"celebrity"}>Mening hikoyam</MenuItem>
              <MenuItem value={"celebrity"}>Mashhurlar</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" sx={{ width: "300px" }}>
          <Typography style={{ color: " #E1FFE9", margin: "10px" }}>
            Mavzu
          </Typography>
          <FormControl
            sx={{ width: "100%", background: "#fff", borderRadius: "10px" }}
          >
            <Select
              value={"celebrity"}
              displayEmpty
              inputProps={{ "aria-label": "without label" }}
            >
              <MenuItem value={"celebrity"}>
                <span>Kategoriyani tanlang</span>
              </MenuItem>
              <MenuItem value={"celebrity"}>Mashhurlar</MenuItem>
              <MenuItem value={"celebrity"}>Restaurantga baho</MenuItem>
              <MenuItem value={"celebrity"}>Mening hikoyam</MenuItem>
              <MenuItem value={"celebrity"}>Mashhurlar</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      {/*@ts-ignore */}
      <Editor
        ref={editorRef}
        initialValue="Type here"
        placeholder="Type here"
        previewStyle="vertical"
        height="440px"
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px", width: "200px", height: "35px" }}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
}
