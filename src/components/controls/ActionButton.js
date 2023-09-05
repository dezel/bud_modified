import React from "react";
import { Button } from "@mui/material";

export default function ActionButton(props) {
  const { children, onClick, ...other } = props;

  return (
    <Button onClick={onClick} {...other}>
      {children}
    </Button>
  );
}
