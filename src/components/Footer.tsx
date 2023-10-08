import { Box, Typography, Link } from "@mui/material/";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        paddingY: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1" sx={{ display: "flex", gap: "5px" }}>
        Follow us:
        <Link href="https://www.integrify.io/">
          <FacebookIcon sx={{ cursor: "pointer", ":hover": { color: "#043380" } }} />
        </Link>
        <Link href="https://www.integrify.io/">
          <InstagramIcon sx={{ cursor: "pointer", ":hover": { color: "#043380" } }} />
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`All rights reserved © ${new Date().getFullYear()} FIN-FS16`}
      </Typography>
    </Box>
  );
};

export default Footer;
