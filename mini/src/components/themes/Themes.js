import {
  CircularProgress,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  gridList: {
    padding: "5px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Themes = ({ re }) => {
  const [col, setCol] = useState(window.innerWidth / 400);
  const [themes, setThemes] = useState([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleResize = () => {
    setCol(Math.round(window.innerWidth / 400));
  };

  const handleClick = async (id) => {
    history.push("/posts/"+id);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/posts");
        setThemes(data);
        setLoading(false);
        console.log(data);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchThemes();
  }, [re]);

  return (
    <Grid xs={12} lg={9} className={"theme-div"}>
      <GridList className={classes.gridList} cols={col}>
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          themes.map((el, idx) => (
            <GridListTile
              key={idx}
              className="hover"
              onClick={() => handleClick(el._id)}
            >
              <img src={"/uploads/" + el.file} alt="img"></img>
              {/* <Link to={`/posts/${el._id}`}> */}
              <GridListTileBar
                title={el.title}
                subtitle={<span>by: {el.creator}</span>}
              />
              {/* </Link> */}
            </GridListTile>
          ))
        )}
      </GridList>
    </Grid>
  );
};

export default Themes;
