import {
  CircularProgress,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import { deleteTheme, getAllThemes } from "../../actions/themeActions";
import Mod from "./modal";

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
  cont: {
    paddingTop: "90px",
    textAlign: "center",
  },
});

const Themes = () => {
  const [col, setCol] = useState(window.innerWidth / 400);
  const classes = useStyles();
  const history = useHistory();

  const handleResize = () => {
    setCol(Math.round(window.innerWidth / 400));
  };

  const handleClick = async (id) => {
    history.push("/posts/" + id);
  };
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const deleteThemeHandler = async (id) => {
    dispatch(deleteTheme(id));
  };

  const { loading, allThemes } = useSelector((state) => state.themes);
  const { loading: fromDeleteState } = useSelector((state) => state.delete);
  const { loading: fromCreateState } = useSelector((state) => state.create);
  const { loading: fromEditState } = useSelector((state) => state.edit);
  const { loggedIn, user } = useSelector((state) => state.user);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    dispatch(getAllThemes());
  }, [dispatch, fromDeleteState, fromCreateState, fromEditState, loggedIn]);

  const [element, setElement] = useState();

  const showModal = (editThis) => {
    setElement(editThis);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Grid xs={12} lg={9} className={"theme-div"}>
      <GridList className={classes.gridList} cols={col}>
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          allThemes.map((el, idx) => (
            <GridListTile key={idx} className="hover">
              <img src={"/uploads/" + el.file} alt="img"></img>
              <GridListTileBar
                title={
                  <span
                    onClick={() => handleClick(el._id)}
                    className="themes-title"
                  >
                    {el.title}
                  </span>
                }
                subtitle={<span>by: {el.creator}</span>}
                actionIcon={
                  <div>
                    <IconButton
                      onClick={() => showModal(el)}
                      disabled={
                        loggedIn
                          ? user.username === el.creator
                            ? false
                            : true
                          : true
                      }
                    >
                      <Edit
                        color={
                          loggedIn
                            ? user.username === el.creator
                              ? "primary"
                              : "disabled"
                            : "disabled"
                        }
                      />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteThemeHandler(el._id)}
                      disabled={
                        loggedIn
                          ? user.username === el.creator
                            ? false
                            : true
                          : true
                      }
                    >
                      <Delete
                        color={
                          loggedIn
                            ? user.username === el.creator
                              ? "error"
                              : "disabled"
                            : "disabled"
                        }
                      />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          ))
        )}
        {openModal && (
          <Mod element={element} openM={openModal} closeModal={closeModal} />
        )}
      </GridList>
    </Grid>
  );
};

export default Themes;
