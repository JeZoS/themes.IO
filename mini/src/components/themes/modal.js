import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTheme } from "../../actions/themeActions";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
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

const Mod = ({ openM, closeModal, element }) => {
  const [modalImage, setModalImage] = useState(null);
  const [title, setTitle] = useState(element.title);
  const [platform, setPlatform] = useState(element.platform);
  const [creater, setCreater] = useState(element.creator);

  const classes = useStyles();

  const changeImageHandler = (e) => {
    setModalImage(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const { loggedIn, user } = useSelector((state) => state.user);

  const onSubmitHandler = async () => {
    if (!loggedIn) {
      dispatch({
        type: "ERROR",
        payload: "Please login first",
      });
      return;
    }
    if (title.length === 0 || platform.length === 0 ) {
      dispatch({
        type: "ERROR",
        payload: "All fields are required!",
      });
    } else {
      var fd = new FormData();
      if (modalImage) {
        fd.append("image", modalImage);
      } else {
        fd.append("file", element.file);
      }
      fd.append("title", title);
      fd.append("creator", user.username);
      fd.append("platform", platform);
      dispatch(editTheme(fd, element._id));
      setModalImage(null);
      closeModal();
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
          {/* <TextField
            value={creater}
            onChange={(e) => setCreater(e.target.value)}
            id="filled-basic"
            label="Creater"
          ></TextField> */}
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
          <img
            className={classes.preview}
            src={
              modalImage
                ? URL.createObjectURL(modalImage)
                : `/uploads/${element.file}`
            }
            alt="preview"
          ></img>
          <Button
            onClick={onSubmitHandler}
            className={classes.btn}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default Mod;
