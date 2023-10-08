import { Outlet } from "react-router-dom";
import { Box } from "@mui/material/";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        minHeight: "100vh",
        maxWidth: "80%",
        marginX: "auto",
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
