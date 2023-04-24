import { Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { Register } from "./Register";
import { SignIn } from "./SignIn";
import { TabPanel } from "./TabPanel";
import Masonry from "@mui/lab/Masonry";

export const Auth = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const heights = [100, 250, 30, 40, 90, 48, 135, 400];

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
      <Masonry columns={3} spacing={2}>
        {heights.map((height, idx) => (
          <div key={idx} style={{ minHeight: height, backgroundColor: "red" }}>
            DIV {idx}
          </div>
        ))}
      </Masonry>
    </Grid>
  );
};
