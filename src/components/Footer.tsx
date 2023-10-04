import { Box, Typography, Container, Link } from "@mui/material/";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1"></Typography>
        <Typography variant="body2" color="text.secondary">
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Quang Tri Cao
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
