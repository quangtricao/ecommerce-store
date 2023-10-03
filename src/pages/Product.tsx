import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { getSingleProduct } from "../api/products";
import { useEffect, useState } from "react";
import { ProductObject } from "../types/Products";

const Product = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<ProductObject | null>(null);

  useEffect(() => {
    getSingleProduct(id).then((res) => {
      if (!(typeof res === "string")) {
        setProduct(res);
      }
    });
  });

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default Product;
