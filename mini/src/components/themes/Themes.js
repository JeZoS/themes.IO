import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  gridList: {
    padding: "5px",
    width: "100%",
    alignItems:"center",
    justifyContent:'space-around'
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

const Themes = () => {
  const [col, setCol] = useState(window.innerWidth / 400);
  const classes = useStyles();

  const handleResize = () => {
    setCol(Math.round(window.innerWidth / 400));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const arr = ["m", "a", "s", "i", "f", "sed", "ad", "f", "sed", "ad"];

  return (
    <Grid xs={12} lg={9} className={"theme-div"}>
      {/* <div className={classes.root}> */}
        <GridList className={classes.gridList} cols={col}>
          {arr.map((el) => (
            <GridListTile>
              <img
                src="https://wallpapercave.com/wp/wp8746212.jpg"
                alt="img"
              ></img>
              <GridListTileBar
                title="Prabhat"
                subtitle={<span>by: JeZoS</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      {/* </div> */}
    </Grid>
  );
};

export default Themes;
