import { CloudDownload } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { verifiedMemberdata } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings(props: any) {
  /** Initializations */
  const { chosenMember } = props;
  const [file, setFile] = useState(verifiedMemberdata?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_description: "",
    mb_image: "",
    mb_address: "",
  });

  /** Handlers */
  const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberDescriptionHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeImagePreviewHandler = (e: any) => {
    try {
      const file = e.target.files[0],
        file_type = file["type"],
        valid_types = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

      assert.ok(valid_types.includes(file_type) && file, Definer.input_err2);
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err: any) {
      console.log(`ERROR::: changeImagePreviewHandler ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  const handleSubmitButton = async () => {
    try {
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);
      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("Modified successfully", 700, false);
      window.location.reload();
    } catch (err) {
      console.log(`ERROR::: changeImagePreviewHandler ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <form className="my_settings">
      <Stack className="img_upload_wrapper">
        <img src={file} alt="" />
        <Stack>
          <span>Rasm Yuklash</span>
          <p>JPG, JPEG, PNG rasmlarini yuklay olasiz!</p>
          <div
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            <Button
              component="label"
              style={{ minWidth: "0", minHeight: "0" }}
              onChange={changeImagePreviewHandler}
            >
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
          placeholder={chosenMember?.mb_nick ?? "Mavjud emas"}
          onChange={changeMemberNickHandler}
        />
      </Stack>
      <Stack className="edit_phone_adress">
        <Stack className="edit_phone">
          <label htmlFor="">Telefon raqam</label>
          <input
            type="text"
            className="mb_phone"
            name="mb_phone"
            placeholder={chosenMember?.mb_phone ?? "Mavjud emas"}
            onChange={changeMemberPhoneHandler}
          />
        </Stack>
        <Stack className="edit_phone">
          <label htmlFor="">Manzil</label>
          <input
            type="text"
            className="mb_adress"
            name="mb_adress"
            placeholder={chosenMember?.mb_adress ?? "Mavjud emas"}
            onChange={changeMemberAddressHandler}
          />
        </Stack>
      </Stack>
      <Stack className="edit_info">
        <label htmlFor="">Ma'lumot</label>
        <textarea
          className="mb_description"
          name="mb_description"
          id=""
          placeholder={chosenMember?.mb_description ?? "Mavjud emas"}
          onChange={changeMemberDescriptionHandler}
          cols={30}
          rows={10}
        ></textarea>
      </Stack>
      <Stack className="edit_btn">
        <Button variant="contained" onClick={handleSubmitButton}>
          Saqlash
        </Button>
      </Stack>
    </form>
  );
}
