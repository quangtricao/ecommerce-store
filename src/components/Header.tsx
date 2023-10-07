import { useNavigate } from "react-router-dom";

import { AppBar, Box, Button } from "@mui/material/";

const pages = [
  { name: "Home", link: "/" },
  { name: "Contact us", link: "/contact" },
];

const user = [
  { name: "My account", link: "/profile" },
  { name: "Baseket", link: "/category"}
]

const Header: React.FC = () => {
  const navigate = useNavigate();
  let url = window.location.pathname;

  return (
    <AppBar position="sticky">
      <Box
        sx={{
          display: { xs: "none", md: "flex", justifyContent: "space-between" },
        }}
      >
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
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      </Box>
    </AppBar>
  );
};

export default Header;
