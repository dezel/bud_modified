import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "./popup.scss";
import { Typography } from "@mui/material";
import Controls from "./../components/controls/Controls";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ title, children, openPopup, setOpenPopup }) => {
  return (
    <Dialog open={openPopup} maxWidth="md" className="dialog-wrapper">
      <DialogTitle className="dialog-title">
        <div style={{ display: "flex" }}>
          <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <Controls.ActionButton
            className="action-button"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Controls.ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
