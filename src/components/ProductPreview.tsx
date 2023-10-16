import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@mui/material";

import { Product } from "../types/product";

type ProductListPreviewProps = {
  product: Product;
  children?: JSX.Element;
};
// scale(1.08)
const ProductPreview = ({ product, children }: ProductListPreviewProps) => {
  return (
    <Grid item xs={1}>
      <Card
        sx={{
          padding: "15px",
          backgroundColor: "#d7eafa",
          borderRadius: "20px",

          "&:hover": {
            transition: "0.5s",
            transform: "translateY(-25px)",
          },
        }}
      >
        <img
          src={product.images[0]}
          alt={`${product.title}`}
          style={{ width: "100%", borderRadius: "20px" }}
        />

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to={`/products/${product.id.toString()}`} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                color: "#1769aa",
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
          <Typography component="div" sx={{ fontSize: 15 }}>
            Category: {product.category.name}
          </Typography>
          <Typography component="div" sx={{ fontSize: 15 }}>
            {`${product.description.slice(0, 100)} ...`}
          </Typography>
          <Typography component="div" sx={{ fontSize: 20, fontWeight: "bold" }}>
            $ {product.price}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductPreview;
