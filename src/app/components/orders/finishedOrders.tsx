import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { TabPanel } from "@mui/lab";
/** Redux */
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/Orderspage/selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";

/** Redux Selector*/
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export function FinishedOrders(props: any) {
  /** Initialization */
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  /** Handlers */
  return (
    <div>
      <TabPanel value={"3"}>
        {finishedOrders?.map((order) => {
          return (
            <Box key={order._id} className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const img_path = `${serverApi}/${product?.product_images[0]}`;
                  return (
                    <Box key={item._id} className="order_name_price">
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
                      <p className="title_dish">{product.product_name}</p>
                      <Box className="price_box">
                        <p>${item.item_price}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{item.item_quantity}</p>
                        <img src="/icons/equal.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
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
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>yetkazish xizmati</p>
                  <p>${order.order_delivery_cost}</p>
                  <p>Jami narx</p>
                  <img src="/icons/equal.svg" alt="" />
                  <p>${order.order_total_amount}</p>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
