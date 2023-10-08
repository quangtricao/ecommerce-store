import { styled } from "@mui/material/styles";
import { AppBar, Container, Link, Box, Button, Tooltip } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const pages = [
  { name: "Home", link: "/" },
  { name: "Contact", link: "/contact" },
];

const settings = [
  { name: "Profile", link: "/profile", element: <AccountCircleOutlinedIcon /> },
  { name: "Cart", link: "/cart", element: <ShoppingCartOutlinedIcon /> },
];

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
  let url = window.location.pathname;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container
        sx={{
          maxWidth: "60%",
          marginX: "auto",
          paddingY: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {pages.map((page) => (
            <Link href={page.link} key={page.name}>
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
              <Link href={setting.link}>
                {url === setting.link ? (
                  <ActiveLink>{setting.element}</ActiveLink>
                ) : (
                  <InactiveLink>{setting.element}</InactiveLink>
                )}
              </Link>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
