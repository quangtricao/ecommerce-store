import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { Product } from "../types/product";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { deleteProduct } from "../redux/reducers/productsReducer";
import { addToCart } from "../redux/reducers/cartsReducer";
import EditModal from "./EditModal";

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartsReducer = useAppSelector((state) => state.cartsReducer);
  const idInCart = cartsReducer.map((product) => String(product.productInCart.id));
  const user = useAppSelector((state) => state.userReducer.authorizedUser);

  let { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  });

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Do you really want to delete?")) {
      const response = dispatch(deleteProduct(id)).unwrap();

      if (typeof response === "string") {
        alert(response);
      } else {
        navigate("/");
      }
    }
  };

  if (!product) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", gap: "50px" }}>
      <Box>
        <img
          src={product.images[0]}
          alt="product detail"
          style={{ height: "400px", borderRadius: "25px" }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2>{product.title}</h2>
          <div>Category: {product.category.name}</div>
          <div>Price: {product.price}</div>
          <div>{product.description}</div>
        </Box>

        <Box sx={{ display: "flex", gap: "15px" }}>
          {idInCart.includes(String(product.id)) ? (
            <Button size="small" variant="contained" startIcon={<CheckIcon />} disabled>
              Already in cart
            </Button>
          ) : (
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              Add to cart
            </Button>
          )}
          {user?.role === "admin" ? (
            <Box sx={{ display: "flex", gap: "15px" }}>
              <EditModal product={product} />
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDeleteProduct(Number(id))}
              >
                Delete
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
