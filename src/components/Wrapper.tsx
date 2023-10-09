import { Box } from "@mui/material";

type WrapperProps = {
  width: string;
  children: JSX.Element;
};

const Wrapper = ({ width, children }: WrapperProps) => {
  return (
    <Box
      sx={{
        maxWidth: { width },
        marginX: "auto",
        padding: "30px",
        backgroundColor: "#e4ebf7",
        borderRadius: "50px",
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
