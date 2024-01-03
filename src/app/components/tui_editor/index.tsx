import React, { useState, useRef, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
  Stack,
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticleInput } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";

export function TuiEditor(props: any) {
  /** Intializations */
  const editorRef = useRef();
  const [communityArticleData, setCommunityArticleData] =
    useState<BoArticleInput>({
      art_subject: "",
      art_content: "",
      bo_id: "",
      art_image: "",
    });

  /** Handlers */
  const uploadImageHandler = async (image: any) => {
    try {
      console.log(uploadImageHandler);
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);

      communityArticleData.art_image = image_name;
      setCommunityArticleData({ ...communityArticleData });

      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log("ERROR, uploadImageHandler", err);
      throw err;
    }
  };

  const changeCategoryHandler = (e: any) => {
    communityArticleData.bo_id = e.target.value;
    setCommunityArticleData({ ...communityArticleData });
  };

  // const changeTitleHandler = (e: any) => {
  //   communityArticleData.art_subject = e.target.value;
  //   setCommunityArticleData({ ...communityArticleData });
  // };

  const changeTitleHandler = useCallback(
    (e: any) => {
      communityArticleData.art_subject = e.target.value;
      setCommunityArticleData({ ...communityArticleData });
    },
    [communityArticleData.art_subject]
  );

  const handleRegisterButton = async () => {
    try {
      console.log("communityArticleData______", communityArticleData);
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();
      console.log("art_content", art_content);

      communityArticleData.art_content = art_content;
      assert.ok(
        communityArticleData.art_content !== "" &&
          communityArticleData.bo_id !== "" &&
          communityArticleData.art_subject !== "",
        Definer.input_err1
      );

      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSuccessAlert("Article is created successfully!");
    } catch (err) {
      console.log("ERROR, handleRegisterButton", err);
      sweetErrorHandling(err).then();
    }
  };
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
              onChange={changeCategoryHandler}
              value={communityArticleData.bo_id}
              displayEmpty
              inputProps={{ "aria-label": "without label" }}
            >
              <MenuItem value="">
                <span>Kategoriyani tanlang</span>
              </MenuItem>
              <MenuItem value={"celebrity"}>Mashhurlar</MenuItem>
              <MenuItem value={"evaluation"}>Restaurantga baho</MenuItem>
              <MenuItem value={"story"}>Mening hikoyam</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" sx={{ width: "300px" }}>
          <Typography style={{ color: " #E1FFE9", margin: "10px" }}>
            Mavzu
          </Typography>
          <TextField
            onChange={changeTitleHandler}
            id="filled-basic"
            label="Mavzu"
            variant="filled"
            style={{
              width: "300px",
              background: "#fff",
            }}
          />
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
            const uploadImageUrl = await uploadImageHandler(image);
            callback(uploadImageUrl);
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
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
}
