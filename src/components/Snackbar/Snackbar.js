import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ToastMessage(props) {
  const { open, onClose, success, message } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
    >
      {success ? (
        <Alert onClose={onClose} severity="success">
          {message}
        </Alert>
      ) : (
        <Alert onClose={onClose} severity="error">
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}

ToastMessage.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
