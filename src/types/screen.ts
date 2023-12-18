import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
  ordersPage: OrdersPageState;
}

export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  terndBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

export interface RestaurantPageState {}
export interface OrdersPageState {}
