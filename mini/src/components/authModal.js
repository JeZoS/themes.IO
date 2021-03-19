import {
  Button,
  makeStyles,
  Modal,
  TextField,
  Typography,
  Zoom,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../actions/userActions";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  changer: {
    margin: "20px 0",
    cursor: "pointer",
  },
});

const AuthModal = ({ open, closeModal }) => {
  const classes = useStyles();

  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const loginHandler = () => {
    if (login) {
      if (password.length <= 0 || email.length <= 0) {
        dispatch({
          type: "ERROR",
          payload: "All fields are required",
        });
        return;
      } else {
        dispatch(loginUser(email, password));
        closeModal();
      }
    } else {
      if (
        password.length <= 0 ||
        conPassword.length <= 0 ||
        email.length <= 0 ||
        username.length <= 0
      ) {
        dispatch({
          type: "ERROR",
          payload: "All fields are required",
        });
        return;
      } else if (password !== conPassword) {
        dispatch({
          type: "ERROR",
          payload: "Password's don't match",
        });
        return;
      } else {
        dispatch(registerUser(email, username, password));
        closeModal();
      }
    }
  };

  return (
    <Modal className="modal" open={open} onClose={closeModal}>
      <div className="modal-div">
        <form className={classes.form}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="filled-basic"
            label="Email"
            type="email"
          ></TextField>
          {login ? null : (
            <Zoom in={true}>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="filled-basic"
                label="Username"
              ></TextField>
            </Zoom>
          )}
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="filled-basic"
            label="Password"
            type="password"
          ></TextField>
          {login ? null : (
            <Zoom in={true}>
              <TextField
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                id="filled-basic"
                label="Confirm-Password"
                type="password"
              ></TextField>
            </Zoom>
          )}
          <Typography
            variant="caption"
            color="textPrimary"
            className={`${classes.changer} LOG-SIG-changer`}
            onClick={() => setLogin(!login)}
          >
            {login ? "Create Account" : "Already have an account"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={loginHandler}
          >
            {login ? "Login" : "Sign Up"}{" "}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
