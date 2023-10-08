import { Box } from "@mui/material";
import Logo from "../assets/img/logo.png";

const Intro = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ color: "#1769aa" }}>
        <h2>About</h2>
      </Box>
      <Box sx={{ display: "flex", gap: "50px", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga a dolor unde, vel
            repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quia,
            voluptate animi eligendi, praesentium suscipit cumque eius consectetur consequatur nulla
            fugit. Nemo ad sequi perferendis fuga dolor unde, vel repudiandae.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quia, voluptate animi
            eligendi, praesentium suscipit cumque eius consectetur consequatur nulla fugit. Nemo ad
            sequi perferendis fuga dolor unde, vel repudiandae. Lorem ipsum dolor sit amet
          </p>
        </Box>
        <img src={Logo} alt="FIN-FS16" style={{ width: "30%" }} />
      </Box>
    </Box>
  );
};

export default Intro;
