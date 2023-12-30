import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Restaurant } from "./user";

/** React app state */
export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
}

/** Homepage */
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

/** Restaurant */
export interface RestaurantPageState {
  targetRestaurants: Restaurant[];
  randomRestaurants: Restaurant[];
  chosenRestaurant: Restaurant | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

/** Orders */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
/** Community */
export interface CommunityPageState {
  targetboArticles: BoArticle[];
}
export interface MemberPageState {
  chosenMember?: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle?: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
