import { CloudDownload } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React from "react";

export function MySettings(props: any) {
  return (
    <form className="my_settings">
      <Stack className="img_upload_wrapper">
        <img src="/icons/author_default.jpeg" alt="" />
        <Stack>
          <span>Rasm Yuklash</span>
          <p>JPG, JPEG, PNG rasmlarini yuklay olasiz!</p>
          <div
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            <Button component="label" style={{ minWidth: "0", minHeight: "0" }}>
              <CloudDownload
                sx={{ cursor: "pointer", width: "20px", height: "20px" }}
              />
              <input type="file" hidden />
            </Button>
          </div>
        </Stack>
      </Stack>
      <Stack className="edit_name">
        <label htmlFor="">Ism</label>
        <input
          className="mb_nick"
          name="mb_nick"
          type="text"
          placeholder="USERNAME"
        />
      </Stack>
      <Stack className="edit_phone_adress">
        <Stack className="edit_phone">
          <label htmlFor="">Telefon raqam</label>
          <input
            type="text"
            className="mb_phone"
            name="mb_phone"
            placeholder="+998 () ...."
          />
        </Stack>
        <Stack className="edit_phone">
          <label htmlFor="">Manzil</label>
          <input
            type="text"
            className="mb_adress"
            name="mb_adress"
            placeholder="Toshkent Yakka Saroy"
          />
        </Stack>
      </Stack>
      <Stack className="edit_info">
        <label htmlFor="">Ma'lumot</label>
        <textarea
          className="mb_description"
          name="mb_description"
          id=""
          placeholder=" Assalomu Alaylum, Men Papays  Developerlaridan biriman!!"
          cols={30}
          rows={10}
        ></textarea>
      </Stack>
      <Stack className="edit_btn">
        <Button variant="contained">Saqlash</Button>
      </Stack>
    </form>
  );
}
