import { Box, Button, Grid, Typography } from "@mui/material";

import { useAppDispatch } from "../redux/hook";
import { sortPriceAscending, sortPriceDescending } from "../redux/reducers/productsReducer";

type SortProps = {
  refetch: boolean;
  setRefetch: (refetch: boolean) => void;
};

const Sort = ({ refetch, setRefetch }: SortProps) => {
  const dispatch = useAppDispatch();
  const sortLowToHigh = () => {
    dispatch(sortPriceAscending());
  };

  const sortHighToLow = () => {
    dispatch(sortPriceDescending());
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ color: "#1769aa", fontSize: "25px", paddingBottom: "10px" }}>
        Sort product by price
      </Typography>
      <Grid container spacing="5px" columns={{ sm: 1, lg: 3 }} sx={{ width: "100%" }}>
        <Grid item xs={1}>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={() => setRefetch(!refetch)}>
            No sort
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={sortLowToHigh}>
            Price-low to high
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={sortHighToLow}>
            Price-high to low
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sort;
