import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import Wrapper from "../components/Wrapper";
import ProductPreview from "../components/ProductPreview";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/reducers/cartsReducer";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector((state) => state.cartsReducer);

  let sum = 0;
  for (const product of productsInCart) {
    sum += product.productInCart.price * product.number;
  }

  const plusOne = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const minusOne = (productNumber: number, id: number) => {
    if (productNumber === 0) {
      dispatch(removeFromCart(id));
    }
    dispatch(decreaseQuantity(id));
  };

  const remove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  if (productsInCart.length === 0) {
    return (
      <Wrapper width="30%">
        <Box sx={{ minHeight: "300px", fontSize: "30px" }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: "50px" }} />
          Your cart is{" "}
          {<p style={{ display: "inline-block", fontWeight: "bold", color: "red" }}>Empty</p>}
          <Box>Please continue shopping</Box>
          <Button variant="contained" onClick={() => handleNavigate("/")}>
            Return to shop
          </Button>
        </Box>
      </Wrapper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        Total items: {productsInCart.length}
        <Box>
          <Button>PROCEED TO CHECKOUT</Button>
          <Button>CLEAR CART</Button>
        </Box>
      </Box>

      <Box>Total amount: {sum}</Box>

      <Grid container alignItems="stretch" spacing={2} columns={3} sx={{ marginTop: "10px" }}>
        {productsInCart.map((product) => (
          <ProductPreview product={product.productInCart} key={product.productInCart.id}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => minusOne(product.number, product.productInCart.id)}
                >
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
          </ProductPreview>
        ))}
      </Grid>
    </Box>
  );
};

export default CartPage;
