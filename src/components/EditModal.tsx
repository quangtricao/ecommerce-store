import { useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { updateProduct } from "../redux/reducers/productsReducer";
import { ProductObject } from "../types/Products";
import { useAppDispatch } from "../redux/hook";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  p: "50px",
  borderRadius: "50px",
};

type ModalProp = {
  product: ProductObject;
};

const EditModal = ({ product }: ModalProp) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditproduct({
      title: product.title,
      price: product.price,
      description: product.description,
    });
    setOpen(false);
  };

  const [editproduct, setEditproduct] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
  });

  const handleConfirmEdit = async () => {
    const response = await dispatch(
      updateProduct({ id: product.id, editedProduct: editproduct })
    ).unwrap();

    if (typeof response === "object") {
      setOpen(false);
    } else {
      alert(response);
    }
  };

  return (
    <div>
      <Button size="small" variant="contained" startIcon={<BorderColorIcon />} onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{product.title}</h2>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <TextField
              label="Title"
              variant="standard"
              value={editproduct.title}
              onChange={({ target }) => setEditproduct({ ...editproduct, title: target.value })}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="standard"
              value={editproduct.description}
              onChange={({ target }) =>
                setEditproduct({ ...editproduct, description: target.value })
              }
            />
            <TextField
              label="Price"
              variant="standard"
              value={editproduct.price}
              onChange={({ target }) =>
                setEditproduct({ ...editproduct, price: Number(target.value) })
              }
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button size="large" variant="contained" onClick={handleConfirmEdit}>
                Confirm
              </Button>
              <Button size="large" variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default EditModal;
