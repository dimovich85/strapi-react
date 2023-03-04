import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import UpdateIcon from "@mui/icons-material/Update";
import Tooltip from "@mui/material/Tooltip";
import EuroIcon from "@mui/icons-material/Euro";
import { ENV } from "../config";
import classes from "./ProductContent.module.css";
import CategoryIcon from "@mui/icons-material/Category";
import { useSnackbar } from "notistack";
import { strapiNormalize } from "../utils";
import { AddProduct } from "./AddProduct";
import { useAuth } from "../hooks/useAuth";

export const ProductsContent = (props) => {
  const { token, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${ENV.STRAPI_URL}/products?populate=photo`);
      const data = await response.json();
      const normalData = strapiNormalize(data);
      console.log(normalData);
      setProducts(normalData);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Sorry, error occured. Try to reload the page.", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>
      <Typography className={classes.h1} variant="h1">
        Hello, {user.username}
      </Typography>
      <Typography variant="h2">
        <Grid flex justifyContent="space-between">
          Products
          <Tooltip
            classes={{
              tooltip: classes.tooltip,
              arrow: classes.arrow,
            }}
            arrow
            placement="right"
            title="Update data"
          >
            <IconButton className={classes.updateBtn}>
              <UpdateIcon className={classes.upodateIcon} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Typography>
      <Grid
        container
        flex
        justifyContent={isLoading ? "center" : "flex-start"}
        alignItems="stretch"
        gap={2}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          products.map((product) => {
            const { id, productName, price, currency, photo } = product;
            return (
              <Grid
                flex
                alignSelf="stretch"
                key={id}
                item
                xs={12}
                md={6}
                lg={3}
              >
                <Paper className={classes.paper} elevation={2}>
                  {photo ? (
                    <Box
                      className={classes.avatarContainer}
                      flex
                      justifyContent="center"
                      mt={1}
                      mb={2}
                    >
                      <img
                        className={classes.img}
                        src={`${ENV.STRAPI_ROOT_URL}${photo.url}`}
                        alt={photo.alternativeText ?? "Product photo"}
                      />
                    </Box>
                  ) : (
                    <Box
                      className={classes.avatarContainer}
                      flex
                      justifyContent="center"
                      mt={1}
                      mb={2}
                    >
                      <Avatar>
                        <CategoryIcon />
                      </Avatar>
                    </Box>
                  )}
                  <Typography variant="h3" mb={2}>
                    {productName}
                  </Typography>
                  <Typography variant="caption">
                    {currency === "USD" && <AttachMoneyIcon />}
                    {currency === "EUR" && <EuroIcon />}
                    {price}
                    {currency === "UAH" && "₴"}
                  </Typography>
                </Paper>
              </Grid>
            );
          })
        )}
      </Grid>
      <AddProduct setIsLoading={setIsLoading} fetchProducts={fetchProducts} />
    </Box>
  );
};
