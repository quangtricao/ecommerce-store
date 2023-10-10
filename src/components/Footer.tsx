import { Box, Typography, Link } from "@mui/material/";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
        <Link href="https://www.google.com/">
          <FacebookIcon sx={{ cursor: "pointer", ":hover": { color: "#043380" } }} />
        </Link>
        <Link href="https://www.google.com/">
          <InstagramIcon sx={{ cursor: "pointer", ":hover": { color: "#043380" } }} />
        </Link>
        <Link href="https://www.google.com/">
          <LinkedInIcon sx={{ cursor: "pointer", ":hover": { color: "#043380" } }} />
        </Link>
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" color="text.secondary">
          {`All rights reserved © ${new Date().getFullYear()} Quang Tri Cao`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The project is inspired by{" "}
          <Link href="https://fakeapi.platzi.com/">Platzi Fake Store API</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
