import { Link } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { ProductObject } from "../types/Products";

type ProductListPreviewProps = {
  product: ProductObject;
};

const ProductListPreview = ({ product }: ProductListPreviewProps) => {
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
            <Typography variant="body2" component="div" sx={{ fontSize: 12 }}>
              {product.description}
            </Typography>
            <br />
            <Typography component="div" sx={{ fontSize: 12 }}>
              Category: {product.category.name}
            </Typography>
            <Typography component="div" sx={{ fontSize: 12 }}>
              Price: {product.price}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default ProductListPreview;
