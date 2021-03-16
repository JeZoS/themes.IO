import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  gridList: {
    padding: "5px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow:"hidden"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

const Themes = () => {
  const [col, setCol] = useState(window.innerWidth / 400);
  const [themes, setThemes] = useState([]);
  const classes = useStyles();

  const handleResize = () => {
    setCol(Math.round(window.innerWidth / 400));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const fetchThemes = async () => {
      const { data } = await axios.get("/posts");
      setThemes(data);
      console.log(data);
    };
    fetchThemes();
  }, []);

  // const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"];

  return (
    <Grid xs={12} lg={9} className={"theme-div"}>
      {/* <div className={classes.root}> */}
      <GridList className={classes.gridList} cols={col}>
        {themes.map((el, idx) => (
          <GridListTile key={idx} className="hover" > 
            <img
              src={el.file}
              alt="img"
            ></img>
            <GridListTileBar
              title={el.title}
              subtitle={<span>by: {el.creator}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
      {/* </div> */}
    </Grid>
  );
};

export default Themes;
