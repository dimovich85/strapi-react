import { Box } from "@mui/system";
import React from "react";

export const TabPanel = (props) => {
  const { index, value, children } = props;

  if (index !== value) return null;
  return <Box p={3}>{children}</Box>;
};
