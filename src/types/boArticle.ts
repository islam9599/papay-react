import { MeLiked } from "./product";
import { Member } from "./user";

export interface BoArticleInput {
  art_subject: string;
  art_content: string;
  art_image: string;
  bo_id: string;
}

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image?: string | null;
  bo_id: string;
  art_status: string;
  art_likes: number;
  art_views: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[]; // Meliked
}

export interface SearchArticleObj {
  page: number;
  limit: number;
  order?: string | null;
  bo_id: string;
}
export interface SearchMemberArticleObj {
  page: number;
  limit: number;
  mb_id: string;
}
