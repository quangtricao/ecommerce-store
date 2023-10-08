import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Box, Button } from "@mui/material";
import { ProductObject } from "../types/Products";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import { addToCart } from "../redux/reducers/cartsReducer";

type ProductDetailProps = {
  product: ProductObject | null;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const dispatch = useAppDispatch();
  const cartsReducer = useAppSelector((state) => state.cartsReducer);
  const idInCart = cartsReducer.map((product) => String(product.productInCart.id));

  if (!product) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: "50px" }}>
      <Box>
        <img src={product.images[0]} alt="" />
      </Box>
      <Box>
        <Box>
          <h2>{product.title}</h2>
        </Box>
        <div>Category: {product.category.name}</div>
        <div>Creation at: {product.creationAt}</div>
        <div>Description: {product.description}</div>

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
      </Box>
    </Box>
  );
};

export default ProductDetail;
