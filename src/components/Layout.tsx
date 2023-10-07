import { Outlet } from "react-router-dom";
import { Box } from "@mui/material/";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
