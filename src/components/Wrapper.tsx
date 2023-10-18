import { useContext } from "react";
import { Box } from "@mui/material";

import { AppContext } from "../App";

type WrapperProps = {
  width: string;
  children: JSX.Element;
};

const Wrapper = ({ width, children }: WrapperProps) => {
  const { theme } = useContext(AppContext);

  return (
    <Box
      sx={{
        maxWidth: { width },
        marginX: "auto",
        padding: "30px",
        backgroundColor: `${theme ? "#e4ebf7" : " #4d6285"}`,
        borderRadius: "50px",
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
