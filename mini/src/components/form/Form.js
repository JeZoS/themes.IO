import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

import React, { useState } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cont: {
    paddingTop: "70px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px",
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
    margin: "10px",
  },
}));

const Form = () => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [creater, setCreater] = useState("");
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("Success uploading Data");

  const changeHandler = (e) => {
    // setImage(e.target.files[0]);
    getBase64(e.target.files[0], (res) => {
      setImage(res);
    });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = async () => {
    if (
      image === null ||
      title.length === 0 ||
      platform.length === 0 ||
      creater.length === 0
    ) {
      setErr(true);
      setMessage("Please fill all the fields");
      handleClick();
    } else {
      setErr(false);
      setMessage("Success uploading data");
      handleClick();
      let data = {
        title:title,
        platform:platform,
        creater:creater,
        file:image
      }
      const config={
        headers:{
          'Content-type':'application/json'
        }
      }
      const response = await axios.post('/posts',data,config)
      // console.log(response)
      setImage(null)
      setTitle("")
      setPlatform("")
      setCreater("")
    }
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = (err) => {
      console.log("ERR: ", err);
    };
  }

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
        <TextField
          value={creater}
          onChange={(e) => setCreater(e.target.value)}
          id="filled-basic"
          label="Creater"
        ></TextField>
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
            component="span"
          >
            Upload Image File
          </Button>
        </label>
        {image ? (
          <img
            className={classes.preview}
            src={image}
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={err ? "error" : "success"}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Form;
