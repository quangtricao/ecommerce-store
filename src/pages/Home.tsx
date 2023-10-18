import { useEffect, useState } from "react";
import { Button, Box, Grid, Stack, Pagination } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";

import { getTokenFromLocalStorage } from "../api/localStorage";

import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getCategory } from "../redux/reducers/categoriesReducer";
import { addToCart, removeFromCart } from "../redux/reducers/cartsReducer";
import { addUser, getLoginUserInfo } from "../redux/reducers/userReducer";
import {
  getAllProductLength,
  getAllProductPagination,
  deleteProduct,
} from "../redux/reducers/productsReducer";
import { Product, FilterProductPagination } from "../types/product";

import Intro from "../components/Intro";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ProductPreview from "../components/ProductPreview";
import EditModal from "../components/EditModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const cartsReducer = useAppSelector((state) => state.cartsReducer);
  const user = useAppSelector((state) => state.userReducer.authorizedUser);

  const [totalPages, setTotalPages] = useState(0);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [refetchPageNumber, setRefetchPageNumber] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [filterObject, setFilterObject] = useState<FilterProductPagination>({
    title: "",
    min: "",
    max: "",
    category: "",
    offset: 1,
    limit: 6,
  });
  const idInCart = cartsReducer.map((cart) => String(cart.productInCart.id));

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      dispatch(getLoginUserInfo(token))
        .unwrap()
        .then((response) => {
          if (typeof response === "object") {
            dispatch(addUser(response));
          }
        });
    }
    dispatch(getCategory());
    dispatch(getAllProductPagination(filterObject)); // Only get products in first page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch products by page
  useEffect(() => {
    dispatch(getAllProductPagination({ ...filterObject, offset: page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  // Set the number of page
  useEffect(() => {
    dispatch(
      getAllProductLength({
        title: filterObject.title,
        min: filterObject.min,
        max: filterObject.max,
        category: filterObject.category,
      })
    )
      .unwrap()
      .then((response) => {
        if (filterObject.limit) {
          setTotalPages(Math.ceil(response / filterObject.limit));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchPageNumber]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setRefetch(!refetch);
  };

  const submitFilter = () => {
    setPage(1);
    setRefetch(!refetch);
    setRefetchPageNumber(!refetchPageNumber);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Do you really want to delete?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then((response) => {
          if (typeof response === "string") {
            alert(response);
          } else {
            dispatch(removeFromCart(id));
            setRefetch(!refetch);
            setRefetchPageNumber(!refetchPageNumber);
          }
        });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Intro />
      <Filter
        submitFilter={submitFilter}
        setFilterObject={setFilterObject}
        filterObject={filterObject}
      />
      <Sort refetch={refetch} setRefetch={setRefetch} />
      <Grid container alignItems="stretch" spacing={2} columns={{ sm: 1, md: 2, xl: 3 }}>
        {products.map((product: Product) => (
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
          count={totalPages}
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
