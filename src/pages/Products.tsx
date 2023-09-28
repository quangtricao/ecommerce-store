import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { initializeProducts } from "../redux/slices/productsReducer";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(initializeProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(products);

  return <div>Products</div>;
};

export default Products;
