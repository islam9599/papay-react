import { Box, Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import Marginer from "../marginer";
/** Redux */
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/Orderspage/selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import { Order } from "../../../types/order";
import moment from "moment";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";

/** Redux Selector*/
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

export function ProceedOrders(props: any) {
  /** Initialization */
  const { processOrders } = useSelector(processOrdersRetriever);

  /** Handlers */
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };
      if (!localStorage.getItem("member_data")) {
        sweetFailureProvider("Please login first!", true);
      }
      let confirmation = window.confirm(
        "Buyurtmaga buyurtamani olganingizni tasdiqlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("finishOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <TabPanel value={"2"}>
        {processOrders?.map((order: Order) => {
          return (
            <Box className="order_main_box" key={order._id}>
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
                          borderRadius: "29px",
                          marginLeft: "40px",
                          marginRight: "30px",
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
                style={{ background: "rgba(140, 102, 242, 0.81)" }}
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
                <Box className="total_price_btn">
                  <p>{moment(order.createdAt).format("YY-MM-DD HH:mm")}</p>
                  <Button
                    value={order._id}
                    onClick={finishOrderHandler}
                    variant="contained"
                  >
                    Yakunlash
                  </Button>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </TabPanel>
    </div>
  );
}
