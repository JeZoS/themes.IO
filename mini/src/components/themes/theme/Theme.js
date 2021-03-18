import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const useStyles = makeStyles({
  images: {
    height: "90vh",
  },
  cent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000105",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/dark-geometric.png")',
  },
});

const Theme = () => {
  const classes = useStyles();
  const [theme, setTheme] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchSingle = async () => {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTheme({ ...data });
      console.log(theme);
    };
    fetchSingle();
    // eslint-disable-next-line
  }, [params.id]);
  return (
    <div style={{ paddingTop: "60px", flexGrow: "1" }}>
      <Grid container spacing={3}>
        <Grid item className={classes.cent} xs="12" sm={6}>
          <img
            className={`${classes.images} rot`}
            src={"/uploads/" + theme.file}
            alt="themesImage"
          ></img>
        </Grid>
        <Grid item sm={6} xs="12" className={classes.text}>
          <Typography variant="h2">{theme.title}</Typography>
          <Typography color="secondary" variant="h5">
            By: {theme.creator}
          </Typography>
          <Typography
            variant="p"
            color="error"
            style={{
              maxWidth: "400px",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            Created with KWGT , Wallpaper from Zedge, Icon from Zetta Icons Pro
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginTop: "1rem" }}
          >
            Download Resources
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Theme;
