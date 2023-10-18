import { Box, Typography } from "@mui/material";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h2" sx={{ color: "#1769aa", paddingBottom: "15px", fontSize: "45px" }}>
        About
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          gap: "10%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga a dolor unde, vel
            repudiandae.Lorem ipsum dolor siicing elit. Fuga a dolor unde, vel repudiandae.Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Fuga quia, voluptate animi eligendi,
            praesentium suscipit cumque eius consectetur consequatur nulla fugit. Nemo ad sequi
            perferendis fuga dolor unde, vel repudiandae. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Fuga a dolor unde, vel repudiandae.Lorem ipsum dolor siicing elit.
            Fuga a dolor unde, vel repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Fuga quia, voluptate animi eligendi, praesentium suscipit cumque eius consectetur
            consequatur nulla fugit. Nemo ad sequi perferendis fuga dolor unde, vel repudiandae.
          </Typography>
          <Link to="/sell" style={{ textDecoration: "none", width: "fit-content" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#1769aa",
                ":hover": {
                  color: "red",
                  transition: "0.4s",
                },
              }}
            >
              Have something to sell?
            </Typography>
          </Link>
        </Box>
        <img src={Logo} alt="FIN-FS16" style={{ borderRadius: "10px", width: "350px" }} />
      </Box>
    </Box>
  );
};

export default Intro;
