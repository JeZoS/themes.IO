import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cont: {
    paddingTop: "40px",
    // borderRadius: "15px",
    textAlign:"center",
    backgroundColor: "white",

  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "white",
    margin: "10px",
    borderRadius: "15px",
  },
  btn: {
    margin: "20px",
  },
}));

const Form = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.cont} container-fluid xs={12} lg={3}>
      <Typography variant="h5">Submit Your Themes</Typography>
      <form className={classes.form} autoComplete="off">
        <TextField id="filled-basic" label="Title"></TextField>
        <TextField id="filled-basic" label="Platform"></TextField>
        <TextField id="filled-basic" label="Creater"></TextField>
        <TextField id="filled-basic" label="Image"></TextField>
        <Button className={classes.btn} variant="outlined" color="primary">
          Primary
        </Button>
      </form>
    </Grid>
  );
};

export default Form;
