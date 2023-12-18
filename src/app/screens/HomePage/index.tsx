import React, { useEffect } from "react";
import "../../../css/home.css";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisement";
import { Events } from "./events";
import { Recommendations } from "./recommendations";

// Redux

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopRestaurants } from "./silce";
import { retrieveBestRestaurants, retrieveTopRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";

/** Redux Slice */

const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
});
/** Redux Selector*/

const topRestaurantRetriever = createSelector(
  retrieveTopRestaurants,
  (topRestaurants) => ({
    topRestaurants,
  })
);
const bestRestaurantRetriever = createSelector(
  retrieveBestRestaurants,
  (bestRestaurants) => ({
    bestRestaurants,
  })
);

export function HomePage() {
  /** Initialization */
  // selector: store => data
  const { setTopRestaurants } = actionDispatch(useDispatch());
  const { topRestaurants } = useSelector(topRestaurantRetriever);
  // const { bestRestaurants } = useSelector(bestRestaurantRetriever);
  console.log("topRestaurants::::::", topRestaurants);
  // console.log("bestRestaurants::::::", bestRestaurants);

  useEffect(() => {
    // backend data request =>  data

    // slice:  data => redux store
    setTopRestaurants([]);
  }, []);
  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
