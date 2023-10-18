import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@mui/icons-material";
import { Button, Box } from "@mui/material";

import Wrapper from "../components/Wrapper";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper width="20%">
      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <Box sx={{ color: "red", fontSize: "30px", textAlign: "center" }}>404: Page Not Found</Box>
        <Button variant="contained" onClick={() => navigate("/")} startIcon={<ArrowLeftOutlined />}>
          Take me back to website
        </Button>
      </Box>
    </Wrapper>
  );
};

export default ErrorPage;
