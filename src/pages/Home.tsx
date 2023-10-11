import { useEffect, useState } from "react";
import { Button, Box, Grid, Stack, Pagination } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";

import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getCategory } from "../redux/reducers/categoriesReducer";
import { addToCart } from "../redux/reducers/cartsReducer";
import { FilterPagination, ProductObject } from "../types/Products";

import Intro from "../components/Intro";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ProductPreview from "../components/ProductPreview";
import EditModal from "../components/EditModal";
import { getTokenFromLocalStorage } from "../api/token";
import { addUser, getLoginUserInfo } from "../redux/reducers/userReducer";
import { getAllProduct, fetchAllByFilter, deleteProduct } from "../redux/reducers/productsReducer";

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsReducer.products);
  const cartsReducer = useAppSelector((state) => state.cartsReducer);
  const user = useAppSelector((state) => state.userReducer.authorizedUser);

  const [totalPages, setTotalPages] = useState(0);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [filterObject, setFilterObject] = useState<FilterPagination>({
    title: "",
    min: "",
    max: "",
    id: "",
    offset: 1,
  });
  const idInCart = cartsReducer.map((cart) => String(cart.productInCart.id));

  // Refetch products by page
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(getAllProduct({ ...filterObject, offset: value }));
  };

  // After filter, return to page 1
  const submitFilter = () => {
    setPage(1);
    setRefetch(!refetch);
    dispatch(getAllProduct(filterObject));
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Do you really want to delete?")) {
      const response = dispatch(deleteProduct(id)).unwrap();

      if (typeof response === "string") {
        alert(response);
      } else {
        setRefetch(!refetch);
      }
    }
  };

  // Set the number of page after click Button Filter
  useEffect(() => {
    dispatch(
      fetchAllByFilter({
        title: filterObject.title,
        min: filterObject.min,
        max: filterObject.max,
        id: filterObject.id,
      })
    )
      .unwrap()
      .then((response) => setTotalPages(Math.ceil(response.length / 12)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  // Initially set the number of page
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
    dispatch(getAllProduct({ offset: 1 }));
    dispatch(fetchAllByFilter({}))
      .unwrap()
      .then((response) => setTotalPages(Math.ceil(response.length / 12)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <Intro />
      <Filter
        submitFilter={submitFilter}
        setFilterObject={setFilterObject}
        filterObject={filterObject}
      />
      <Sort />
      <Grid container alignItems="stretch" spacing={2} columns={{ sm: 1, md: 2, xl: 3 }}>
        {products.map((product: ProductObject) => (
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
