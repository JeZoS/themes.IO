import {
  Button,
  CircularProgress,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles,
  Modal,
  Snackbar,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/DeleteForeverOutlined";
import MuiAlert from "@material-ui/lab/Alert";

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
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
    // marginRight: "30px",
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
    history.push("/posts/" + id);
  };

  const [openModal, setOpenModal] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/posts");
        setThemes(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchThemes();
  }, [re, render]);

  const [element, setElement] = useState({
    _id: "",
    file: null,
    title: "",
    creator: "",
    platform: "",
  });
  const showModal = (p) => {
    setElement(p);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const deleteTheme = async (id) => {
    try {
      const { data } = await axios.delete(`posts/${id}`);
      setRender(!render);
    } catch (err) {
      setRender(!render);
    }
  };

  return (
    <Grid xs={12} lg={9} className={"theme-div"}>
      <GridList className={classes.gridList} cols={col}>
        {loading ? (
          <div className={classes.progress}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          themes.map((el, idx) => (
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
                    <IconButton onClick={() => showModal(el)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => deleteTheme(el._id)}>
                      <Delete color="error" />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          ))
        )}
        <Mod
          element={element}
          openM={openModal}
          setRender={setRender}
          closeModal={closeModal}
        />
      </GridList>
    </Grid>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Mod = ({ openM, closeModal, element, setRender }) => {
  const [modalImage, setModalImage] = useState(null);
  const [title, setTitle] = useState();
  const [platform, setPlatform] = useState();
  const [creater, setCreater] = useState();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState("Success uploading Data");

  const classes = useStyles();

  const changeImageHandler = (e) => {
    setModalImage(e.target.files[0]);
  };

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      closeModal();
      setRender((prev) => !prev);
      setOpen(false);
    }, [1000]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [themeId, setThemeId] = useState(null);

  useEffect(() => {
    const fetchTheme = async () => {
      if (!element._id) return;
      try {
        const { data } = await axios.get(`/posts/${element._id}`);
        if (data && data.file) {
          setModalImage(null);
          setOpen(false);
          setThemeId(data._id);
          setTitle(data.title);
          setCreater(data.creator);
          setPlatform(data.platform);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTheme();
  }, [openM]);

  const onSubmitHandler = async () => {
    if (title.length === 0 || platform.length === 0 || creater.length === 0) {
      setErr(true);
      setMessage("Please fill all the fields");
      handleClick();
    } else {
      var fd = new FormData();
      if (modalImage) {
        fd.append("image", modalImage);
      } else {
        fd.append("file", element.file);
      }
      fd.append("title", title);
      fd.append("creator", creater);
      fd.append("platform", platform);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      try {
        const response = await axios.patch(`/posts/${themeId}`, fd, config);
        setModalImage(null);
        setErr(false);
        setMessage("Success uploading data");
        handleClick();
      } catch (err) {
        setErr(true);
        setMessage("Server Error");
        handleClick();
      }
    }
  };

  return (
    <Modal className="modal" open={openM} onClose={closeModal}>
      <div className="modal-div">
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
          <label htmlFor="btnn-upload">
            <input
              id="btnn-upload"
              name="btnn-upload"
              style={{ display: "none" }}
              type="file"
              onChange={(e) => changeImageHandler(e)}
            />
            <Button
              className={classes.upldbtn}
              variant="outlined"
              color="secondary"
              component="span"
            >
              Upload Image File
            </Button>
          </label>
          {modalImage ? (
            <img
              className={classes.preview}
              src={URL.createObjectURL(modalImage)}
              alt="preview"
            ></img>
          ) : element.file ? (
            <img
              className={classes.preview}
              src={`/uploads/${element.file}`}
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
      </div>
    </Modal>
  );
};

export default Themes;
