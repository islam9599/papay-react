import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import {} from "../../types/others";
import { FollowSearchObj, Follower, Following } from "../../types/follow";

class FollowApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
    try {
      let url = `/follow/followers?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const followers: Follower[] = result.data.data;
      return followers;
    } catch (err: any) {
      console.log(`error:: getMemberFollowers ${err.message}`);
      throw err;
    }
  }
  public async getMemberFollowings(
    data: FollowSearchObj
  ): Promise<Following[]> {
    try {
      let url = `/follow/followings?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const followings: Following[] = result.data.data;
      return followings;
    } catch (err: any) {
      console.log(`error:: getMemberFollowings ${err.message}`);
      throw err;
    }
  }
  public async subscribe(mb_id: string): Promise<boolean> {
    try {
      const url = "/follow/subscribe",
        result = await axios.post(
          this.path + url,
          { mb_id: mb_id },
          {
            withCredentials: true,
          }
        );

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);
      const subscribe = result.data.data;
      return subscribe;
    } catch (err: any) {
      console.log(`error:: subscribe ${err.message}`);
      throw err;
    }
  }
  public async unSubscribe(mb_id: string): Promise<boolean> {
    try {
      const url = "/follow/unsubscribe",
        result = await axios.post(
          this.path + url,
          { mb_id: mb_id },
          {
            withCredentials: true,
          }
        );

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);
      const unsubscribe = result.data.data;
      return unsubscribe;
    } catch (err: any) {
      console.log(`error:: unSubscribe ${err.message}`);
      throw err;
    }
  }
}

export default FollowApiService;
