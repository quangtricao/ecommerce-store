import { Link } from "react-router-dom";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";

import { ProductObject } from "../types/Products";
import { addToCart } from "../redux/reducers/cartsReducer";
import { useAppDispatch, useAppSelector } from "../redux/hook";

type ProductListPreviewProps = {
  product: ProductObject;
};

const ProductPreview = ({ product }: ProductListPreviewProps) => {
  const dispatch = useAppDispatch();
  const cartsReducer = useAppSelector((state) => state.cartsReducer);
  const idInCart = cartsReducer.map((product) => String(product.productInCart.id));

  return (
    <Grid item xs={1}>
      <Card
        sx={{
          "&:hover": {
            transition: "0.5s",
            transform: "scale(1.2)",
          },
        }}
      >
        <img
          src={product.images[0]}
          alt={`${product.title}`}
          style={{ width: "100%", minHeight: "300px" }}
        />

        <CardContent>
          <Link to={`/products/${product.id.toString()}`} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "#1769aa",
                fontSize: 15,
                fontWeight: "bold",
                ":hover": {
                  color: "#f2749c",
                },
              }}
            >
              {product.title}
            </Typography>
          </Link>
          <Typography component="div" sx={{ fontSize: 15 }}>
            Category: {product.category.name}
          </Typography>
          <Typography component="div" sx={{ fontSize: 20, fontWeight: "bold" }}>
            $ {product.price}
          </Typography>

          {idInCart.includes(String(product.id)) ? (
            <Button variant="contained" startIcon={<CheckIcon />} disabled>
              Already in cart
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              Add to cart
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductPreview;
