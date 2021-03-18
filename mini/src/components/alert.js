import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertComp = () => {
  //   const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { success, change, message, current } = useSelector(
    (state) => state.alert
  );

  useEffect(() => {
    setOpen(current);
  }, [change]);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success ? "success" : "error"}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertComp;
