import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Product } from "../../types/product";
import { CartItem, ProductSearchObj } from "../../types/others";

class OrderApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async createOrder(data: CartItem[]) {
    try {
      const url = "/orders/create",
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const order: any = result.data.data;
      return order;
    } catch (err: any) {
      console.log(`error:: createOrder ${err.message}`);
      throw err;
    }
  }
}

export default OrderApiService;