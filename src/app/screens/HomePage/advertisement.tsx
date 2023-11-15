import React from "react";
import { Container } from "@mui/material";

export function Advertisements() {
  return (
    <div className="ads_restaurant_frame">
      <video
        className="ads_video"
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
        src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/VZpg_YkTgilrvkdxa/videoblocks-116z_010_kuxnja_bba_vjdjj__9d1218e85b42403dcb753d26a5a3fe67__P360.mp4"
      >
        <source
          data-src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/VZpg_YkTgilrvkdxa/videoblocks-116z_010_kuxnja_bba_vjdjj__9d1218e85b42403dcb753d26a5a3fe67__P360.mp4"
          type="video/mp4"
          src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/VZpg_YkTgilrvkdxa/videoblocks-116z_010_kuxnja_bba_vjdjj__9d1218e85b42403dcb753d26a5a3fe67__P360.mp4"
        />
      </video>
    </div>
  );
}
