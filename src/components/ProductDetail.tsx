import { Box, Typography } from "@mui/material";
import { ProductObject } from "../types/Products";

type ProductDetailProps = {
  product: ProductObject | null;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <Box>
      <Typography variant="h1" sx={{ fontSize: 30, fontWeight: "bold", mb: 2 }}>
        {product?.title}
      </Typography>
      <div>Creation at: {product?.creationAt}</div>
      <div>Description: {product?.description}</div>
    </Box>
  );
};

export default ProductDetail;
