import React, { useEffect, useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantPage } from "./screens/RestaurantPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/Orderspage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPage";
import { HomePage } from "./screens/HomePage";
import { LoginPage } from "./screens/LoginPage";
import { NavbarHome } from "./components/header";
import { NavbarRestaurant } from "./components/header/restaurant";
import { NavbarOthers } from "./components/header/others";
import { Footer } from "./components/footer";
import AuthentificationModal from "./auth";
import { Member } from "../types/user";
import { serverApi } from "../lib/config";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";
import { Definer } from "../lib/Definer";
import assert from "assert";
import MemberApiService from "./apiServices/memberApiService";
import "../app/apiServices/verify";
import { CartItem } from "../types/others";
import { Product } from "../types/product";

function App() {
  /** Initializations */

  const [path, setPath] = useState();
  const main_paith = window.location.pathname;
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

  /** Handlers */

  const handleSignupOpen = () => {
    setSignupOpen(true);
  };
  const handleSignupClose = () => {
    setSignupOpen(false);
  };
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
  };
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberApiService();
      await member.logoutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (product: Product) => {
    const exist = cartItems.find((item: CartItem) => item._id === product._id);
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  console.log("onAdd:::", onAdd);

  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };
  return (
    <Router>
      {main_paith == "/" ? (
        <NavbarHome
          setPath={setPath}
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : main_paith.includes("/restaurant") ? (
        <NavbarRestaurant
          setPath={setPath}
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      ) : (
        <NavbarOthers
          setPath={setPath}
          handleSignupOpen={handleSignupOpen}
          handleLoginOpen={handleLoginOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
        />
      )}

      <Switch>
        <Route path="/restaurant">
          <RestaurantPage onAdd={onAdd} />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage
            orderRebuild={orderRebuild}
            setOrderRebuild={setOrderRebuild}
          />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
      <AuthentificationModal
        loginOpen={loginOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        signupOpen={signupOpen}
        handleSignupOpen={handleSignupOpen}
        handleSignupClose={handleSignupClose}
      />
    </Router>
  );
}

export default App;
