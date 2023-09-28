import { useNavigate } from "react-router-dom";

import { AppBar, Box, Button } from "@mui/material/";

const pages = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/profile" },
  { name: "Cart Page", link: "/cart" },
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  let url = window.location.pathname;

  return (
    <AppBar position="sticky">
      <Box sx={{ marginLeft: "10%", display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={() => navigate(page.link)}
            sx={{
              my: "20px",
              fontWeight: "800",
              color: `${url === page.link ? "#f07f7f" : "white"}`,
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </AppBar>
  );
};

export default Header;
