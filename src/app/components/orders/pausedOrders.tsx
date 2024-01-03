import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import Marginer from "../marginer";
/** Redux */
import { createSelector } from "reselect";
import {
  retrieveFinishedOrders,
  retrievePausedOrders,
  retrieveProcessOrders,
} from "../../screens/Orderspage/selector";
import { useSelector } from "react-redux";
import { Order } from "../../../types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import { connected } from "process";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberdata } from "../../apiServices/verify";

/** Redux Selector*/
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export function PausedOrders(props: any) {
  /** Initialization */
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** Handlers */
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };
      if (!verifiedMemberdata) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm(
        "Buyurtmani bekor qilishni xohlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!verifiedMemberdata) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm("Buyurtmaga tolov qilasizmi?");
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("processOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <Stack style={{ marginTop: "30px" }}>
        <Marginer direction="horizontal" width="877" height="1" bg="#fff" />
      </Stack>
      <TabPanel value={"1"}>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box" key={order._id}>
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const img_path = `${serverApi}/${product?.product_images[0]}`;
                  return (
                    <Box className="order_name_price" key={item._id}>
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
                      <p className="title_dish">{product?.product_name}</p>
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

              <Box className="total_price_box black_solid">
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
                <Box className="total_price_btn">
                  <Button
                    value={order._id}
                    onClick={deleteOrderHandler}
                    variant="contained"
                    color="secondary"
                  >
                    Bekor Qilish
                  </Button>
                  <Button
                    value={order._id}
                    onClick={processOrderHandler}
                    variant="contained"
                  >
                    To'lash
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
