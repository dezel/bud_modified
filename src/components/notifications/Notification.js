import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Notification = ({ notify, setNotify }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      vertical="top"
      horizontal="right"
      className="snack-bar"
      onClose={handleClose}
    >
      <MuiAlert severity="success" onClose={handleClose}>
        {notify.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Notification;
