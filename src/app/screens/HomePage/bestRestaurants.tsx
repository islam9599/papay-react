import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import {
  Card,
  CardOverflow,
  Typography,
  IconButton,
  AspectRatio,
  Link,
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy";
import { Favorite, LocationOnRounded, Call } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export function BestRestaurants() {
  return (
    <div className="best_restaurant_frame">
      <img
        src={"icons/line_group.svg"}
        alt=""
        style={{ position: "absolute", left: "6%" }}
      />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box sx={{ mb: "43px" }} className="category_title">
            Zo’r Restaurantlar
          </Box>
          <Stack flexDirection={"row"}>
            <CssVarsProvider>
              <Card
                variant="outlined"
                sx={{
                  minHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio={"1"}>
                    <img src="/restaurant/burak.jpeg" loading="lazy" alt="" />
                  </AspectRatio>

                  <IconButton
                    aria-label="Like animal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil Restaurant
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<LocationOnRounded />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    Tashkent, Kuyluk 5-1
                  </Link>
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<Call />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    998902662562
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100{" "}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    sx={{
                      fontSize: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  minHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio={"1"}>
                    <img src="/restaurant/burak.jpeg" loading="lazy" alt="" />
                  </AspectRatio>

                  <IconButton
                    aria-label="Like animal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil Restaurant
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<LocationOnRounded />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    Tashkent, Kuyluk 5-1
                  </Link>
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<Call />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    998902662562
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100{" "}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    sx={{
                      fontSize: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  minHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio={"1"}>
                    <img src="/restaurant/burak.jpeg" loading="lazy" alt="" />
                  </AspectRatio>

                  <IconButton
                    aria-label="Like animal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil Restaurant
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<LocationOnRounded />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    Tashkent, Kuyluk 5-1
                  </Link>
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<Call />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    998902662562
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100{" "}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    sx={{
                      fontSize: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
              <Card
                variant="outlined"
                sx={{
                  minHeight: 483,
                  minWidth: 320,
                  mr: "35px",
                  cursor: "pointer",
                }}
              >
                <CardOverflow>
                  <AspectRatio ratio={"1"}>
                    <img src="/restaurant/burak.jpeg" loading="lazy" alt="" />
                  </AspectRatio>

                  <IconButton
                    aria-label="Like animal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      bottom: 0,
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.4)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  Texas De Brazil Restaurant
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<LocationOnRounded />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    Tashkent, Kuyluk 5-1
                  </Link>
                </Typography>
                <Typography textColor="neutral.300">
                  <Link
                    href=""
                    startDecorator={<Call />}
                    textColor={"rgba(56, 55, 55, 0.90);"}
                  >
                    998902662562
                  </Link>
                </Typography>
                <CardOverflow
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 1.5,
                    px: "var(--Card-padding)",
                    borderTop: "1px solid",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100{" "}
                    <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    sx={{
                      fontSize: "md",
                      color: "rgba(56, 55, 55, 0.90);",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>50</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
            </CssVarsProvider>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Button style={{ background: "#1976D2", color: "#fff" }}>
              BARCHASINI KO’RISH
            </Button>
          </Stack>
        </Stack>
      </Container>
      ;
    </div>
  );
}
