import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { ProductObject } from "../types/Products";

type ProductListPreviewProps = {
  product: ProductObject;
};

const ProductPreview = ({ product }: ProductListPreviewProps) => {
  return (
    <Grid component="article" item xs={1}>
      <Link to={`/products/${product.id.toString()}`} style={{ textDecoration: "none" }}>
        <Card
          variant="elevation"
          sx={{
            minHeight: "350px",
            transition: "1s",
            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <img src={product.images[0]} alt={`${product.title}`} style={{ width: "100%" }} />
          <CardContent>
            <Box component="div">
              <Typography
                variant="body2"
                component="strong"
                sx={{
                  fontSize: 15,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                {product.title}
              </Typography>
            </Box>
            <Typography component="div" sx={{ fontSize: 15 }}>
              Category: {product.category.name}
            </Typography>
            <Typography component="div" sx={{ fontSize: 20, fontWeight: "bold" }}>
              $ {product.price}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default ProductPreview;
