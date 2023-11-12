import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";

import React from "react";

export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img src={"/footer_papay.svg"} />
              </Box>
              <Box className="main_txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste
              </Box>
              <Stack className="contact_links">
                <Box>
                  <Facebook />
                </Box>
                <Box>
                  <Twitter />
                </Box>
                <Box>
                  <Instagram />
                </Box>
                <Box>
                  <YouTube />
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="parts_subject">Bo'limlar</Box>
              <Box className="divider"></Box>
              <Box className="targets">
                Bosh Sahifa Oshxonalar Jamiyat Yordam
              </Box>
            </Stack>

            <Stack className="find_us">
              <Box className="find">Bizni top</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "19.38px" }}>
                <Box className="detail_one">L.</Box>
                <Box className="detail_second">Uzbekistan</Box>
              </Stack>

              <Stack className="details" sx={{ mt: "42px" }}>
                <Box className="detail_one">P.</Box>
                <Box className="detail_second">+998 - 99 266 25 62</Box>
              </Stack>

              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_one">E.</Box>
                <Box className="detail_second">Papays@restaurant.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner"></Box>
          <Box className="copyrights">
            Copyright Papays 2022, All right reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
