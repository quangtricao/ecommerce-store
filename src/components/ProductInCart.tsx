import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/reducers/cartsReducer";
import { ProductObject } from "../types/Products";
import { useAppDispatch } from "../redux/hook";

type ProductInCartProps = {
  product: {
    productInCart: ProductObject;
    number: number;
  };
};

const ProductInCart = ({ product }: ProductInCartProps) => {
  const dispatch = useAppDispatch();
  const plusOne = (id: number) => {
    dispatch(increaseQuantity(id));
  };
  const minusOne = (id: number) => {
    if (product.number === 0) {
      dispatch(removeFromCart(id));
    }
    dispatch(decreaseQuantity(id));
  };
  const remove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Grid item xs={1}>
      <Card>
        <img
          src={product.productInCart.images[0]}
          alt={`${product.productInCart.title}`}
          style={{ width: "100%", minHeight: "300px" }}
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Link
            to={`/products/${product.productInCart.id.toString()}`}
            style={{ textDecoration: "none" }}
          >
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
              {product.productInCart.title}
            </Typography>
          </Link>
          <Typography component="div" sx={{ fontSize: 15 }}>
            {product.productInCart.description}
          </Typography>
          <Typography component="div" sx={{ fontSize: 20, fontWeight: "bold" }}>
            $ {product.productInCart.price}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Button variant="outlined" onClick={() => minusOne(product.productInCart.id)}>
                -
              </Button>
              <Button variant="outlined" disabled>
                {product.number}
              </Button>
              <Button variant="outlined" onClick={() => plusOne(product.productInCart.id)}>
                +
              </Button>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => remove(product.productInCart.id)}
            >
              Remove
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductInCart;
