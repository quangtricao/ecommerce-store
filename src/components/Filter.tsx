import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Slider,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../redux/hook";
import { FilterObject } from "../types/Products";

type FilterProps = {
  filterObject: FilterObject;
  submitFilter: () => void;
  setFilterObject: (obj: FilterObject) => void;
};

const Filter = ({ submitFilter, setFilterObject, filterObject }: FilterProps) => {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);

  const [minmax, setMinmax] = useState<number[]>([0, 1000]);
  const handleMinMaxChange = (event: any, newValue: number | number[]) => {
    setMinmax(newValue as number[]);
    setFilterObject({
      ...filterObject,
      min: String(event.target.value[0]),
      max: String(event.target.value[1]),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h3" sx={{ color: "#1769aa", fontSize: "25px" }}>
        Filter Product
      </Typography>

      <Grid container spacing={2} columns={{ sm: 1, lg: 5 }}>
        <Grid item xs={1}>
          <TextField
            id="titleFilter"
            label="Product title"
            size="small"
            variant="outlined"
            value={filterObject.title}
            onChange={({ target }) => setFilterObject({ ...filterObject, title: target.value })}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth>
            <InputLabel id="category" size="small">
              Category
            </InputLabel>
            <Select
              labelId="category"
              id="category-select"
              label="Category"
              size="small"
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
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Typography>
            Price range: {minmax[0]} - {minmax[1]}
          </Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={minmax}
            onChange={handleMinMaxChange}
            valueLabelDisplay="auto"
            step={50}
            min={0}
            max={1000}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        size="small"
        type="button"
        onClick={submitFilter}
        sx={{ width: "50%" }}
      >
        Filter
      </Button>
    </Box>
  );
};
export default Filter;
