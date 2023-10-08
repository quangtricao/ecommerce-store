import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { Box, Grid, Pagination, Stack } from "@mui/material";

import { getAllProduct } from "../redux/reducers/productsReducer";
import { getCategory } from "../redux/reducers/categoriesReducer";
import { ProductObject } from "../types/Products";
import ProductPreview from "../components/ProductPreview";
import Filter from "../components/Filter";
import Intro from "../components/Intro";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const pages = Math.ceil(products.length / 15);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Intro />
      <Filter products={products}/>
      <Grid container alignItems="stretch" spacing={2} columns={5} sx={{ marginTop: "50px" }}>
        {products.map((product: ProductObject) => (
          <ProductPreview product={product} key={product.id} />
        ))}
      </Grid>
      <Stack spacing={2} sx={{ width: "50%", margin: "50px auto" }}>
        <Pagination count={pages} showFirstButton showLastButton />
      </Stack>
    </Box>
  );
};

export default Home;
