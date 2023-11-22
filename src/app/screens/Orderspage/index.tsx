import React, { useState } from "react";
import "../../../css/order.css";
import { Box, Container, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { PausedOrders } from "../../components/orders/pausedOrders";
import { ProceedOrders } from "../../components/orders/proceedOrders";
import { FinishedOrders } from "../../components/orders/finishedOrders";
import Marginer from "../../components/marginer";
import LocationOn from "@mui/icons-material/LocationOn";

export function OrdersPage() {
  const [value, setValue] = useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order_page">
      <Container className="order_page_container" maxWidth="lg">
        <Stack className="order_left">
          <TabContext value={value}>
            <Box className="order_nav_frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "100%",
                  }}
                  variant="fullWidth"
                >
                  <Tab label="Buyurtmalarim" value="1" />
                  <Tab label="Jarayonda" value="2" />
                  <Tab label="Yakunlangan" value="3" />
                </TabList>
              </Box>
            </Box>
            <Stack className="order_main_content">
              <PausedOrders />
              <ProceedOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order_right">
          <Box className="order_info_box">
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <div className="order_user_img">
                <img
                  src="/icons/author_default.jpeg"
                  className="autor_user_avatar"
                  alt=""
                  style={{
                    width: "117px",
                    height: "112px",
                    marginBottom: "15px",
                  }}
                />
                <div className="mini_user">
                  <img src="/icons/mini-user.svg" alt="" />
                </div>
                <span>Ergashev Islombek</span>
                Foydalanuvchi
              </div>
              <Marginer
                direction="horizontal"
                width="333"
                height="2"
                bg="#A1A1A1;"
              />
            </Box>
            <Box className="order_user_location">
              <LocationOn />
              <p>Toshkent Mirobod Salom Kuyluk</p>
            </Box>
          </Box>

          <Box className="order_user_payment">
            <form className="payment_process" action="">
              <Box>
                <input
                  className="card_num"
                  type="text"
                  placeholder="Card number : 5243 4090 2002 7495"
                />
              </Box>
              <Box className="card_date">
                <input type="number" placeholder="07 / 24" />
                <input type="text" placeholder="CVV : 010" />
              </Box>

              <input
                className="card_num"
                type="text"
                placeholder="Ergashev Islombek"
              />
            </form>
            <Box className="payment_cards">
              <img src="/icons/w-union.svg" alt="" />
              <img src="/icons/m-card.svg" alt="" />
              <img src="/icons/Paypal.svg" alt="" />
              <img src="/icons/w-union.svg" alt="" />
            </Box>
          </Box>
        </Stack>
      </Container>
      ;
    </div>
  );
}
