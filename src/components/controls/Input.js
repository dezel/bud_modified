import React from "react";
import { TextField } from "@mui/material";

const Input = ({
  name,
  label,
  value,
  type = null,
  error = null,
  onChange,
  ...rest
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(type && { type })}
      {...(error && { error: true, helperText: error })}
      {...rest}
    />
  );
};

export default Input;
