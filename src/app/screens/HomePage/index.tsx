import React, { useEffect } from "react";
import "../../../css/home.css";
import { Container } from "@mui/material";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisement";
import { Events } from "./events";
import { Recommendations } from "./recommendations";

export function HomePage() {
  useEffect(() => {
    console.log("componentnDidMount => dataFetch");
    return () => {
      console.log("componentnWillUnMount process");
    };
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
