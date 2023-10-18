import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { AppContext } from "../App";
import { Product } from "../types/product";

type ProductListPreviewProps = {
  product: Product;
  children?: JSX.Element;
};

const ProductPreview = ({ product, children }: ProductListPreviewProps) => {
  const { theme } = useContext(AppContext);

  return (
    <Grid item xs={1}>
      <Card
        sx={{
          backgroundColor: `${theme ? "#d7eafa" : "#4d6285"}`,
          borderRadius: "20px",
          "&:hover": {
            transition: "0.5s",
            transform: "translateY(-25px)",
          },
        }}
      >
        <CardContent>
          <Link to={`/products/${product.id.toString()}`} style={{ textDecoration: "none" }}>
            <img
              src={product.images[0]}
              alt={`${product.title}`}
              style={{ width: "100%", borderRadius: "20px" }}
            />
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "bold",
                ":hover": {
                  transition: "0.3s",
                  color: "red",
                },
              }}
            >
              {product.title}
            </Typography>
          </Link>
          <Box
            sx={{
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography component="div" sx={{ fontSize: 15 }}>
              Category: {product.category.name}
            </Typography>
            <Typography component="div" sx={{ fontSize: 15 }}>
              {`${product.description.slice(0, 100)} ...`}
            </Typography>
            <Typography component="div" sx={{ fontSize: 20, fontWeight: "bold" }}>
              $ {product.price}
            </Typography>
          </Box>

          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductPreview;
