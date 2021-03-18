import { Grid, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment, useState } from "react";

import "./App.css";
import Form from "./components/form/Form";
import Themes from "./components/themes/Themes";
import Theme from "./components/themes/theme/Theme";
import Navbar from "./components/navbar";
import AlertComp from "./components/alert";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: "20px",
  },
}));

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <AlertComp />
        <Switch>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/posts/:id" component={Theme}></Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

const Main = () => {
  const classes = useStyles();
  const [change, SetChange] = useState(true);

  return (
    <div className={classes.root}>
      <Grid container>
        <Themes re={change} />
        <Form funk={SetChange} re={change} />
      </Grid>
    </div>
  );
};

// const Navbar = () => {
//   return (
//     <AppBar elevation={0} position="fixed">
//       <Toolbar variant="dense">
//         <Typography variant="h6" color="inherit">
//           Themes.IO
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// };

export default App;
