import { Outlet } from "react-router-dom";
import { Box } from "@mui/material/";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;
