import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { Grid } from "@mui/material";

import { getAllProduct } from "../redux/reducers/productsReducer";
import { getCategory } from "../redux/reducers/categoriesReducer";
import { ProductObject } from "../types/Products";
import ProductPreview from "../components/ProductPreview";
import Filter from "../components/Filter";
import Intro from "../components/Intro";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: "60%", margin: "50px auto" }}>
      <Intro />
      <Filter />
      <Grid container alignItems="stretch" spacing={2} columns={5} sx={{ marginTop: "50px" }}>
        {products.map((product: ProductObject) => (
          <ProductPreview product={product} key={product.id} />
        ))}
      </Grid>
    </div>
  );
};

export default Home;
