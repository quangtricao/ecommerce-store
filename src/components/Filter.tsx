import { useState } from "react";
import { Box, Button, FormControl, Slider } from "@mui/material";

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
    <FormControl sx={{ width: 500 }}>
      <Box>
        Filter by name:{" "}
        <input
          name="name filter"
          id="nameFilter"
          type="text"
          value={filterObject.title}
          onChange={({ target }) => setFilterObject({ ...filterObject, title: target.value })}
        />
      </Box>
      <Box>
        Category:
        <select
          name="category"
          id="category"
          style={{ marginLeft: "10px", width: "100px" }}
          onChange={({ target }) => setFilterObject({ ...filterObject, id: target.value })}
        >
          <option value="">All</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </Box>
      <Box sx={{ width: "100%" }}>
        Price range: {value[0]} - {value[1]}
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
      <Button variant="outlined" size="small" onClick={submitFilter} sx={{ width: "50%" }}>
        Filter
      </Button>
    </FormControl>
  );
};
export default Filter;
