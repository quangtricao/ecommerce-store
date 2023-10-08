import { Link, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Badge, Box, Button, Tooltip } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppSelector } from "../redux/hook";

const ActiveLink = styled(Button)({
  fontSize: "20px",
  fontWeight: "bold",
  ":hover": {
    backgroundColor: "white",
  },
});

const InactiveLink = styled(Button)({
  color: "black",
  fontSize: "20px",
  fontWeight: "bold",
  ":hover": {
    color: "#1769aa",
    transition: "0.4s",
    backgroundColor: "white",
  },
});

const Header = () => {
  let url = useLocation().pathname;
  const productsInCart = useAppSelector((state) => state.cartsReducer);

  const pages = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
  ];

  const settings = [
    { name: "Profile", link: "/profile", element: <AccountCircleOutlinedIcon /> },
    {
      name: "Cart",
      link: "/cart",
      element: (
        <Badge badgeContent={productsInCart.length} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge>
      ),
    },
  ];

  return (
    <Box
      component="header"
      sx={{
        paddingY: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex" }}>
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
