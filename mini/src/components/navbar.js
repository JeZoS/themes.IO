import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { LockOutlined } from "@material-ui/icons";
import AuthModal from "./authModal";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { loggedIn, user } = useSelector((state) => state.user);
  const [auth, setAuth] = React.useState(loggedIn);

  useEffect(() => {
    setAuth(loggedIn);
  }, [loggedIn]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch({
      type: "LOGOUT",
    });
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Themes.IO
          </Typography>
          {auth ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
              <Typography variant="h6">{user.username}</Typography>
            </div>
          ) : (
            <IconButton color="inherit" onClick={() => setOpenModal(true)}>
              <LockOutlined />
              <Typography variant="h6">Login</Typography>
            </IconButton>
          )}
        </Toolbar>
        {openModal && <AuthModal open={openModal} closeModal={closeModal} />}
      </AppBar>
    </div>
  );
}

export default Navbar;
