import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import {} from "../../types/others";
import {
  BoArticle,
  BoArticleInput,
  SearchArticleObj,
  SearchMemberArticleObj,
} from "../../types/boArticle";

class CommunityApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  async getTargetArticle(data: SearchArticleObj): Promise<BoArticle[]> {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`error:: getTargetArticle ${err.message}`);
      throw err;
    }
  }
  async getMemberCommunityArticle(
    data: SearchMemberArticleObj
  ): Promise<BoArticle[]> {
    try {
      let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`error:: getMemberCommunityArticle ${err.message}`);
      throw err;
    }
  }
  public async getChosenArticle(art_id: string): Promise<BoArticle> {
    try {
      const url = `/community/single-article/${art_id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);
      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`error:: getChosenArticle ${err.message}`);
      throw err;
    }
  }
  public async uploadImageToServer(image: any): Promise<string> {
    try {
      let form_data = new FormData();
      form_data.append("community_image", image);
      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: form_data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);
      const image_name: string = result.data.data;
      console.log("image_name:::::", image_name);
      return image_name;
    } catch (err: any) {
      console.log(`error:: getChosenArticle ${err.message}`);
      throw err;
    }
  }
  public async createArticle(data: BoArticleInput): Promise<BoArticle> {
    try {
      const url = `/community/create`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.data);
      const article: BoArticle = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`error:: createArticle ${err.message}`);
      throw err;
    }
  }
}

export default CommunityApiService;
