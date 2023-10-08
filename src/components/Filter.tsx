import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";

import { FilterObject } from "../types/Products";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getAllProduct } from "../redux/reducers/productsReducer";

const Filter = () => {
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

  const submitFilter = () => {
    dispatch(getAllProduct(filterObject));
  };

  return (
    <FormControl sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
      <Box sx={{ fontSize: "25px" }}>Filter</Box>
      <TextField
        id="titleFilter"
        label="Product title"
        variant="outlined"
        value={filterObject.title}
        onChange={({ target }) => setFilterObject({ ...filterObject, title: target.value })}
        sx={{ width: "50%" }}
      />
      <TextField
        id="priceFilter"
        label="Product price"
        variant="outlined"
        value={filterObject.price}
        onChange={({ target }) => setFilterObject({ ...filterObject, price: target.value })}
        sx={{ width: "50%" }}
      />
      <Box sx={{ width: "100%" }}>
        Category:
        <Select
          labelId="category"
          id="category"
          onChange={({ target }) => setFilterObject({ ...filterObject, id: target.value })}
          value={filterObject.id}
          sx={{ width: "100%", marginTop: "5px" }}
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
    </FormControl>
  );
};
export default Filter;
