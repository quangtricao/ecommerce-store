import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { Box, Button, FormControl, Grid, Slider } from "@mui/material";

import { fetchProducts } from "../redux/slices/productsReducer";
import { fetchCategories } from "../redux/slices/categoriesReducer";
import { ProductObject } from "../types/Products";

import ProductPreview from "../components/ProductPreview";

const Products = () => {
  const dispatch = useAppDispatch();
  const productsReducer = useAppSelector((state) => state.productsReducer);
  const categoriesReducer = useAppSelector((state) => state.categoriesReducer);

  const [filterObject, setFilterObject] = useState({
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

  useEffect(() => {
    dispatch(fetchProducts({ title: "", price: "", min: "", max: "", id: "" }));
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitFilter = () => {
    dispatch(fetchProducts(filterObject));
  };

  return (
    <div>
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
            {categoriesReducer.categories.map((item) => (
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

      <div style={{ maxWidth: "80%", margin: "50px auto" }}>
        <Grid container alignItems="stretch" spacing={2} columns={5}>
          {productsReducer.products.map((product: ProductObject) => (
            <ProductPreview product={product} key={product.id} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Products;
