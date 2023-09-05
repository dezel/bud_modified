import { Button as MuiButton } from "@mui/material";

const Button = ({ text, size, color, variant, onClick, ...rest }) => {
  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...rest}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
