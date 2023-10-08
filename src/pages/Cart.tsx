import { useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import ProductInCart from "../components/ProductInCart";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const productsInCart = useAppSelector((state) => state.cartsReducer);

  let sum = 0;
  for (const product of productsInCart) {
    sum += product.productInCart.price * product.number;
  }

  if (productsInCart.length === 0) {
    return (
      <Box>
        <ShoppingCartOutlinedIcon />
        Your cart is{" "}
        {<p style={{ display: "inline-block", fontWeight: "bold", color: "red" }}>Empty</p>}
        <Box>Please continue shopping</Box>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Return to shop
        </Button>
      </Box>
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
      <Grid container alignItems="stretch" spacing={2} columns={4} sx={{ marginTop: "10px" }}>
        {productsInCart.map((item) => (
          <ProductInCart product={item} key={item.productInCart.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default CartPage;
