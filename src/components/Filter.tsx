import { useState } from "react";
import { Box, Button, FormControl, MenuItem, Select, Slider, TextField, Grid } from "@mui/material";

import { FilterObject, ProductObject } from "../types/Products";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllProduct, replace } from "../redux/reducers/productsReducer";

type FilterProps = {
  products: ProductObject[];
};

const Filter = ({ products }: FilterProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const [filterObject, setFilterObject] = useState<FilterObject>({
    title: "",
    price: "",
    min: "",
    max: "",
    id: "",
  });
  const [value, setValue] = useState<number[]>([0, 1000]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    setFilterObject({
      ...filterObject,
      min: String(event.target.value[0]),
      max: String(event.target.value[1]),
    });
  };

  const sortLowToHigh = () => {
    const shallowCopy = products.slice();
    const sortedProducts = shallowCopy.sort((a, b) => a.price - b.price);
    dispatch(replace(sortedProducts));
  };

  const sortHighToLow = () => {
    const shallowCopy = products.slice();
    const sortedProducts = shallowCopy.sort((a, b) => b.price - a.price);
    dispatch(replace(sortedProducts));
  };

  const submitFilter = () => {
    dispatch(getAllProduct(filterObject));
  };

  return (
    <FormControl
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Box sx={{ color: "#1769aa" }}>
        <h2>Filter Product</h2>
      </Box>

      <Grid container spacing="5px" columns={3}>
        <Grid item xs={2}>
          <TextField
            id="titleFilter"
            label="Product title"
            variant="outlined"
            value={filterObject.title}
            onChange={({ target }) => setFilterObject({ ...filterObject, title: target.value })}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            id="priceFilter"
            label="Product price"
            variant="outlined"
            value={filterObject.price}
            onChange={({ target }) => setFilterObject({ ...filterObject, price: target.value })}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "150px" }}>Category Filter: </Box>
        <Select
          labelId="category"
          id="category"
          onChange={({ target }) => setFilterObject({ ...filterObject, id: target.value })}
          value={filterObject.id}
          sx={{ width: "100%" }}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "250px", marginRight: "20px" }}>
          Price range: {value[0]} - {value[1]}
        </Box>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={50}
          min={0}
          max={1000}
        />
      </Box>
      <Button variant="contained" size="small" onClick={submitFilter} sx={{ width: "100%" }}>
        Filter
      </Button>

      <Box sx={{ color: "#1769aa" }}>
        <h2>Sort product by price</h2>
      </Box>
      <Grid container spacing="5px" columns={3}>
        <Grid item xs={1}>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={submitFilter}>
            No sort
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={sortLowToHigh}>
            Price-low to high
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={sortHighToLow}>
            Price-high to low
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};
export default Filter;
