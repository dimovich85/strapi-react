import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { ENV } from "../config";
import { useAuth } from "../hooks/useAuth";
import { useStyles } from "./style";
import { useStyles2 } from "./style2";

export const SignIn = (props) => {
  const { onAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const { classes, cx } = useStyles({ passText: passValue });
  const { classes: classes2 } = useStyles2();
  const onChangeLogin = (e) => setLoginValue(e.target.value);
  const onChangePass = (e) => setPassValue(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (loginValue.length === 0 || passValue.length < 6) {
      enqueueSnackbar(
        "Fill the fields with correct data! Login cannot be empty and pass should be 6 or more chars",
        { variant: "warning" }
      );
      return;
    }
    try {
      const response = await fetch(`${ENV.STRAPI_URL}/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginValue,
          password: passValue,
        }),
      });
      const data = await response.json();
      console.log(data);
      onAuth(data.jwt, data.user);
    } catch (e) {
      enqueueSnackbar("Something went wrong, please try again", {
        variant: "error",
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Box p={1}>
        <TextField
          fullWidth
          variant="outlined"
          label="Login (email):"
          name="username"
          value={loginValue}
          onChange={onChangeLogin}
        />
      </Box>
      <Box p={1} mb={2}>
        <TextField
          variant="outlined"
          label="Password:"
          name="password"
          type="password"
          fullWidth
          value={passValue}
          onChange={onChangePass}
        />
      </Box>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        size="large"
      >
        Login
      </Button>
      {/* <Button className={cx(classes.btn, classes.btnOffset)}>
        <div></div>
        TEST 1
      </Button>
      <Button className={cx(classes.btn, classes.btnOffset)}>TEST 2</Button>
      <div className={classes2.block} /> */}
      <div className={classes.block}>HELLO</div>
    </form>
  );
};
