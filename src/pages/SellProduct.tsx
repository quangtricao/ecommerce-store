import axios from "axios";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import Wrapper from "../components/Wrapper";

const SellProduct = () => {
  const [sellProduct, setSellProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleUploadProduct = () => {
    axios
      .post("https://api.escuelajs.co/api/v1/products/", sellProduct)
      .then(() => {
        alert("Upload product successfully");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Wrapper width="75%">
      <Box>
        <h2>Tell us more about what you want to sell</h2>
        <TextField
          required
          label="item"
          sx={{ mb: 2 }}
          fullWidth
          value={sellProduct.title}
          onChange={(event) => setSellProduct({ ...sellProduct, title: event.target.value })}
        />
        <TextField
          required
          label="price"
          sx={{ mb: 2 }}
          fullWidth
          value={sellProduct.price}
          onChange={(event) => setSellProduct({ ...sellProduct, price: event.target.value })}
        />

        <TextField
          label="Message"
          multiline
          minRows={6}
          sx={{ mb: 2 }}
          fullWidth
          value={sellProduct.description}
          onChange={(event) => setSellProduct({ ...sellProduct, description: event.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleUploadProduct}>
          Upload
        </Button>
      </Box>
    </Wrapper>
  );
};
export default SellProduct;
