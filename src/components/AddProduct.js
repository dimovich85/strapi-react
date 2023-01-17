import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { ENV } from "../config";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import { useAuth } from "../hooks/useAuth";

export const AddProduct = (props) => {
  const { token } = useAuth();
  const { setIsLoading, fetchProducts } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [productName, setProductName] = useState("");
  const [price, setProductPrice] = useState(0);
  const [currency, setCurrency] = useState("UAH");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onProductName = (e) => setProductName(e.target.value);
  const onPrice = (e) => setProductPrice(e.target.value);
  const onCurrency = (e) => setCurrency(e.target.value);
  const onAdd = async (e) => {
    e.preventDefault();
    const newProduct = {
      productName,
      price,
      currency,
    };
    setIsLoading(true);
    try {
      const response = await fetch(`${ENV.STRAPI_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: newProduct }),
      });
      if (!response.ok) throw new Error();
      console.log(await response.json());
      enqueueSnackbar("Product successfully added!", { variant: "success" });
      fetchProducts();
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Sorry, try again", { variant: "error" });
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };
  return (
    <Box mt={4} pb={6}>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <form onSubmit={onAdd}>
            <Box p={1}>
              <TextField
                fullWidth
                variant="outlined"
                label="Product name:"
                value={productName}
                onChange={onProductName}
              />
            </Box>
            <Box p={1}>
              <TextField
                fullWidth
                variant="outlined"
                label="Price:"
                value={price}
                onChange={onPrice}
              />
            </Box>
            <Box p={1}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                label="Currency"
                onChange={onCurrency}
              >
                <MenuItem value={"UAH"}>Hryvna</MenuItem>
                <MenuItem value={"USD"}>Dollar</MenuItem>
                <MenuItem value={"EUR"}>Euro</MenuItem>
              </Select>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={onAdd} type="submit">
            Add product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
