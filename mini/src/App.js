import {
  AppBar,
  Typography,
  Grid,
  makeStyles,
  Toolbar,
} from "@material-ui/core";

import "./App.css";
import Form from "./components/form/Form";
import Themes from "./components/themes/Themes";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation="off"  position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Themes
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Themes />
        <Form />
      </Grid>
    </div>
  );
}

export default App;
