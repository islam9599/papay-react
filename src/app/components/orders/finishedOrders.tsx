import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
/** Redux */
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/Orderspage/selector";
import { useSelector } from "react-redux";

/** Redux Selector*/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

const pausedOrders = [[1, 2, 3]];
export function FinishedOrders() {
  /** Initialization */
  // const { finishedOrders } = useSelector(finishedOrdersRetriever);

  /** Handlers */
  return (
    <div>
      <TabPanel value={"3"}>
        {pausedOrders?.map((order) => {
          const img_path = `/restaurant/boyin-food.jpeg`;
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.map((item) => {
                  return (
                    <Box className="order_name_price">
                      <img
                        src={img_path}
                        style={{
                          width: "50px",
                          height: "47px",
                          borderRadius: "49px",
                          marginLeft: "40px",
                          marginRight: "20px",
                        }}
                        alt=""
                      />
                      <p className="title_dish">Boyin Burger</p>
                      <Box className="price_box">
                        <p>$10</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>2</p>
                        <img src="/icons/equal.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>$20</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Stack
                className="total_price_box black_solid"
                style={{ background: "#FF3434" }}
              >
                <Box className="box_total">
                  <p>Mahsulot narxi</p>
                  <p>$60</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>yetkazish xizmati</p>
                  <p>$15</p>
                  <p>Jami narx</p>
                  <img src="/icons/equal.svg" alt="" />
                  <p>$75</p>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
