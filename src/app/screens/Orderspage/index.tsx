import React, { useState, useEffect } from "react";
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
import { Order } from "../../../types/order";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveFinishedOrders,
  retrievePausedOrders,
  retrieveProcessOrders,
} from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import OrderApiService from "../../apiServices/orderApiService";
import { Member } from "../../../types/user";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});
/** Redux Selector*/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export function OrdersPage(props: any) {
  /** Initialization */
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const verifiedMemberdata: Member | null = props.verifiedMemberdata;

  useEffect(() => {
    const order = new OrderApiService();
    // paused orders
    order
      .getMyOrders("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    // process orders
    order
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    // finished orders
    order
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild]);

  /** Handlers */
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
              <PausedOrders setOrderRebuild={props.setOrderRebuild} />
              <ProceedOrders setOrderRebuild={props.setOrderRebuild} />
              <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
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
                  src={verifiedMemberdata?.mb_image}
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
                <span>{verifiedMemberdata?.mb_nick}</span>
                {verifiedMemberdata?.mb_type ?? "Foydalanuvchi"}
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
              <p>{verifiedMemberdata?.mb_address ?? "Manzil kiritilmagan!"}</p>
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
