import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { ENV } from "../config";
import { SimpleContext } from "../context/simpleContext";
import { useAuth } from "../hooks/useAuth";

export const Register = (props) => {
  const { onAuth: onRegister } = useAuth;
  const someName = useContext(SimpleContext);
  const { enqueueSnackbar } = useSnackbar();
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
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
      const response = await fetch(`${ENV.STRAPI_URL}/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginValue,
          password: passValue,
          email: loginValue,
        }),
      });
      const data = await response.json();
      console.log(data);
      onRegister(data.jwt, data.user);
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
        REGISTER
      </Button>
      HELLO, {someName}
    </form>
  );
};
