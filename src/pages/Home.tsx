import { useEffect, useState } from "react";
import { Button, Box, Grid, Stack, Pagination } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";

import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllProduct } from "../redux/reducers/productsReducer";
import { getCategory } from "../redux/reducers/categoriesReducer";
import { addToCart } from "../redux/reducers/cartsReducer";
import { FilterObject, ProductObject } from "../types/Products";

import Intro from "../components/Intro";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ProductPreview from "../components/ProductPreview";
import axios from "axios";
import EditModal from "../components/EditModal";
import { getTokenFromLocalStorage } from "../api/token";
import { addUser, getLoginUserInfo } from "../redux/reducers/userReducer";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const cartsReducer = useAppSelector((state) => state.cartsReducer);
  const user = useAppSelector((state) => state.userReducer.authorizedUser);

  const pages = Math.ceil(products.length / 16);
  const idInCart = cartsReducer.map((cart) => String(cart.productInCart.id));

  const [refetch, setRefetch] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [displayProduct, setDisplayProduct] = useState<ProductObject[] | null>(null);
  const [filterObject, setFilterObject] = useState<FilterObject>({
    title: "",
    price: "",
    min: "",
    max: "",
    id: "",
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const submitFilter = () => {
    setPage(1);
    dispatch(getAllProduct(filterObject));
    setRefetch(!refetch);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Do you really want to delete?")) {
      axios
        .delete(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then(() => {
          setRefetch(!refetch);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.escuelajs.co/api/v1/products/?title=${
          filterObject.title ? filterObject.title : ""
        }&price=${filterObject.price ? filterObject.price : ""}&price_min=${
          filterObject.min ? filterObject.min : ""
        }&price_max=${filterObject.max ? filterObject.max : ""}&categoryId=${
          filterObject.id ? filterObject.id : ""
        }&offset=${(page - 1) * 12}&limit=12`
      )
      .then((response) => {
        setDisplayProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, page]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      dispatch(getLoginUserInfo(token))
        .unwrap()
        .then((response) => {
          if (typeof response === "object") {
            dispatch(addUser(response));
            dispatch(getAllProduct());
            dispatch(getCategory());
          }
        });
    }
    dispatch(getAllProduct());
    dispatch(getCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!displayProduct) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Intro />
      <Sort />
      <Filter
        submitFilter={submitFilter}
        setFilterObject={setFilterObject}
        filterObject={filterObject}
      />

      <Grid container alignItems="stretch" spacing={2} columns={{ sm: 1, md: 2, xl: 3 }}>
        {displayProduct.map((product: ProductObject) => (
          <ProductPreview product={product} key={product.id}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <EditModal product={product} />
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </Box>
              ) : null}
            </Box>
          </ProductPreview>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ margin: "0 auto" }}>
        <Pagination
          size="large"
          count={pages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
};

export default Home;
