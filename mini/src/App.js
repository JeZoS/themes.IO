import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  makeStyles,
  Toolbar,
  IconButton,
} from "@material-ui/core";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            Themes
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
