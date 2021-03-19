import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme } from "../../actions/themeActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cont: {
    paddingTop: "90px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
    marginRight: "30px",
    borderRadius: "15px",
  },
  btn: {
    margin: "20px",
  },
  preview: {
    height: "200px",
    width: "200px",
    objectFit: "contain",
    margin: "5px",
  },
  upldbtn: {
    margin: "20px 10px 10px 10px",
  },
}));

const Form = () => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [creater, setCreater] = useState("");

  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const { loggedIn, user } = useSelector((state) => state.user);

  const onSubmitHandler = async () => {
    if (!loggedIn) {
      dispatch({
        type: "ERROR",
        payload: "Please login first",
      });
      return;
    }
    if (image === null || title.length === 0 || platform.length === 0) {
      dispatch({
        type: "ERROR",
        payload: "All fileds are required",
      });
    } else {
      var fd = new FormData();
      fd.append("image", image);
      fd.append("title", title);
      fd.append("creator", user.username);
      fd.append("platform", platform);
      dispatch(createTheme(fd));
      setImage(null);
      setTitle("");
      setPlatform("");
      // setCreater("");
    }
  };

  return (
    <Grid className={classes.cont} container-fluid="true" xs={12} lg={3}>
      <Typography variant="h5">Submit Your Themes</Typography>
      <form className={classes.form} autoComplete="off">
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="filled-basic"
          label="Title"
        ></TextField>
        <TextField
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          id="filled-basic"
          label="Platform"
        ></TextField>
        {/* <TextField
          value={creater}
          onChange={(e) => setCreater(e.target.value)}
          id="filled-basic"
          label="Creater"
        ></TextField> */}
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => changeHandler(e)}
          />
          <Button
            className={classes.upldbtn}
            variant="outlined"
            color="secondary"
            component="span"
          >
            Upload Image File
          </Button>
        </label>
        {image ? (
          <img
            className={classes.preview}
            src={URL.createObjectURL(image)}
            alt="preview"
          ></img>
        ) : null}
        <Button
          onClick={onSubmitHandler}
          className={classes.btn}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default Form;
