import { Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { Register } from "./Register";
import { SignIn } from "./SignIn";
import { TabPanel } from "./TabPanel";

export const Auth = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid flex justifyContent="center" alignItems="center">
      <Tabs centered value={value} onChange={handleChange}>
        <Tab label="Login" />
        <Tab label="Registeration" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SignIn />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register />
      </TabPanel>
    </Grid>
  );
};
