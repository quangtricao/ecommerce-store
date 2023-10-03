import { ProductObject } from "../types/Products";

type ProductDetailProps = {
  product: ProductObject | null;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div>
      {product?.title}
      <div>{product?.description}</div>
    </div>
  );
};

export default ProductDetail;
