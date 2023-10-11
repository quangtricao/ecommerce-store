import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import Wrapper from "../components/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getCategory } from "../redux/reducers/categoriesReducer";
import { createProduct } from "../redux/reducers/productsReducer";

const SellProduct = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const [sellProduct, setSellProduct] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: "",
  });

  useEffect(() => {
    dispatch(getCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadProduct = async () => {
    const response = await dispatch(
      createProduct({
        ...sellProduct,
        categoryId: Number(sellProduct.categoryId),
        price: Number(sellProduct.price),
        images: [sellProduct.images],
      })
    ).unwrap();

    if (typeof response === "object") {
      alert("Your product has been uploaded");
      setSellProduct({ title: "", price: "", description: "", categoryId: "", images: "" });
    } else {
      alert(response);
    }
  };

  return (
    <Wrapper width="75%">
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h2>Tell us more about what you want to sell</h2>
        <TextField
          required
          label="item"
          fullWidth
          value={sellProduct.title}
          onChange={(event) => setSellProduct({ ...sellProduct, title: event.target.value })}
          sx={{ width: "50%" }}
        />
        <TextField
          required
          label="price"
          fullWidth
          value={sellProduct.price}
          onChange={(event) => setSellProduct({ ...sellProduct, price: event.target.value })}
          sx={{ width: "50%" }}
        />
        <TextField
          label="Description"
          required
          multiline
          minRows={6}
          fullWidth
          value={sellProduct.description}
          onChange={(event) => setSellProduct({ ...sellProduct, description: event.target.value })}
        />
        <TextField
          label="Image link"
          required
          value={sellProduct.images}
          onChange={(event) => setSellProduct({ ...sellProduct, images: event.target.value })}
          sx={{ width: "50%" }}
        />
        <FormControl fullWidth>
          <InputLabel id="category" size="small">
            Category
          </InputLabel>
          <Select
            label="Category"
            onChange={({ target }) => setSellProduct({ ...sellProduct, categoryId: target.value })}
            value={sellProduct.categoryId}
            sx={{ width: "50%" }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleUploadProduct}>
          Upload
        </Button>
      </Box>
    </Wrapper>
  );
};
export default SellProduct;
