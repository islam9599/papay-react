import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

/** React app state */
export interface AppRootState {
  homePage: HomePageState;
  restaurantPage: RestaurantPageState;
  ordersPage: OrdersPageState;
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
export interface OrdersPageState {}
