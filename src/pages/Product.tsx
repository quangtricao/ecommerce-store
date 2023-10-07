import axios from "axios";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { useEffect, useState } from "react";
import { ProductObject } from "../types/Products";

const Product = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<ProductObject | null>(null);

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${id}`).then((res) => {
      if (!(typeof res === "string")) {
        setProduct(res.data);
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
