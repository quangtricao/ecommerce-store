import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Badge, Box, Button, Tooltip } from "@mui/material";
import {
  ShoppingCartOutlined,
  AccountCircleOutlined,
  DarkMode,
  LightMode,
} from "@mui/icons-material";

import { AppContext } from "../App";
import { useAppSelector } from "../redux/hook";

const Header = () => {
  let url = useLocation().pathname;
  const productsInCart = useAppSelector((state) => state.cartsReducer);

  const { theme, setTheme } = useContext(AppContext);

  const pages = [
    { name: "Home", link: "/" },
    { name: "Sell", link: "/sell" },
  ];

  const settings = [
    { name: "Profile", link: "/profile", element: <AccountCircleOutlined /> },
    {
      name: "Cart",
      link: "/cart",
      element: (
        <Badge badgeContent={productsInCart.length} color="primary">
          <ShoppingCartOutlined />
        </Badge>
      ),
    },
  ];

  const ActiveLink = styled(Button)({
    fontSize: "20px",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: `${theme ? "white" : "black"}`,
    },
  });

  const InactiveLink = styled(Button)({
    color: `${theme ? "black" : "white"}`,
    fontSize: "20px",
    fontWeight: "bold",
    ":hover": {
      color: "#1769aa",
      transition: "0.4s",
      backgroundColor: `${theme ? "white" : "black"}`,
    },
  });

  return (
    <Box
      component="header"
      sx={{
        paddingY: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {pages.map((page) => (
          <Link to={page.link} key={page.name}>
            {url === page.link ? (
              <ActiveLink>{page.name}</ActiveLink>
            ) : (
              <InactiveLink>{page.name}</InactiveLink>
            )}
          </Link>
        ))}
      </Box>
      <Box>
        <ActiveLink onClick={() => setTheme(!theme)}>
          {theme ? <DarkMode /> : <LightMode />}
        </ActiveLink>
        {settings.map((setting) => (
          <Tooltip title={setting.name} key={setting.name}>
            <Link to={setting.link}>
              {url === setting.link ? (
                <ActiveLink>{setting.element}</ActiveLink>
              ) : (
                <InactiveLink>{setting.element}</InactiveLink>
              )}
            </Link>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
