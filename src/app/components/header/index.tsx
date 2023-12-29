import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ListItemIcon } from "@material-ui/core";
import { Logout } from "@mui/icons-material";
import { Basket } from "./basket";

export function NavbarHome(props: any) {
  // Initialization

  // Handlers

  return (
    <div className="format home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/papay.svg" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Bosh Sahifa
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/restaurant" activeClassName="underline">
                Oshxona
              </NavLink>
            </Box>
            {props.verifiedMemberdata ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/orders" activeClassName="underline">
                  Buyurtma
                </NavLink>
              </Box>
            ) : null}

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Jamiyat
              </NavLink>
            </Box>
            {props.verifiedMemberdata ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  Sahifam
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName="underline">
                Yordam
              </NavLink>
            </Box>

            <Basket
              cartItems={props.cartItems}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onDelete={props.onDelete}
              onDeleteAll={props.onDeleteAll}
            />
            {!props.verifiedMemberdata ? (
              <Box>
                <Button
                  variant="contained"
                  style={{ color: "#fff", background: "#1976d2" }}
                  onClick={props.handleLoginOpen}
                >
                  KIRISH
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                src={props.verifiedMemberdata.mb_image}
                alt="member_img"
                onClick={props.handleLogoutClick}
              />
            )}
            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogout}
              onClick={props.handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px, 2px, 8px, rgba(0, 0, 0, 0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: "''",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={props.handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack className="head_information" justifyContent={"row"}>
          <Stack
            flexDirection={"column"}
            style={{ marginTop: "86px", marginLeft: "24px" }}
          >
            <Box>
              <img src="/icons/wellcome.svg" />
            </Box>
            <Box className="define_restaurant">
              The Authentic Restaurant & Cafe
            </Box>
            <Box className="timeline_service">24 soat xizmatingizdamiz.</Box>
            <Box sx={{ mt: "90px" }}>
              {!props.verifiedMemberdata ? (
                <Button
                  variant="contained"
                  style={{
                    width: "210px",
                    height: "60px",
                    background: "#1976d2",
                    color: "#fff",
                  }}
                  onClick={props.handleSignupOpen}
                >
                  RO’YHATDAN O’TISH
                </Button>
              ) : null}
            </Box>
          </Stack>{" "}
          <Box className="big_img"></Box>
        </Stack>
      </Container>
    </div>
  );
}
