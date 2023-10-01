import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link } from "react-router-dom";

import { fetchProducts } from "../redux/slices/productsReducer";
import { ProductType } from "../types/Products";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

type ProductPreviewProps = {
  product: ProductType;
};

const ProductPreview = ({ product }: ProductPreviewProps) => {
  return (
    <Grid component="article" item xs={1}>
      <Link to={`/brewery/${product.id.toString()}`} style={{ textDecoration: "none" }}>
        <Card
          variant="outlined"
          sx={{
            transition: "1s",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <CardContent>
            <Box component="div">
              <Typography
                variant="body2"
                component="strong"
                sx={{
                  fontSize: 16,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {product.title}
              </Typography>
            </Box>
            <Typography variant="body1" component="div" sx={{ fontSize: 12 }}>
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer);

  const [filterObject, setFilterObject] = useState({
    title: "",
    price: "",
    min: "",
    max: "",
    id: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitFilter = () => {
    dispatch(fetchProducts(filterObject));
  };

  console.log(products.products.length);
  

  return (
    <div>
      <form action="">
        <div>
          Filter by name:{" "}
          <input
            name="name filter"
            id="nameFilter"
            type="text"
            value={filterObject.title}
            onChange={({ target }) => setFilterObject({ ...filterObject, title: target.value })}
          />
        </div>
        <div>
          Category:
          <select
            name="category"
            id="category"
            style={{ marginLeft: "10px", width: "100px" }}
            onChange={({ target }) => setFilterObject({ ...filterObject, id: target.value })}
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          Price range:
          <select
            name="priceRangeMin"
            id="priceRangeMin"
            style={{ margin: "0px 10px", width: "100px" }}
            onChange={({ target }) => setFilterObject({ ...filterObject, min: target.value })}
          >
            <option value=""></option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
          </select>
          to
          <select
            name="priceRangeMax"
            id="priceRangeMax"
            style={{ margin: "0px 10px", width: "100px" }}
            value={filterObject.max}
            onChange={({ target }) => setFilterObject({ ...filterObject, max: target.value })}
          >
            <option value=""></option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="1000">1000</option>
          </select>
        </div>
        <button type="button" onClick={submitFilter}>
          Filter
        </button>
      </form>

      <div style={{ maxWidth: "80%", margin: "50px auto" }}>
        <Grid container alignItems="stretch" spacing={2} columns={5}>
          {products.products.map((product: ProductType) => (
            <ProductPreview product={product} key={product.id} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Products;
