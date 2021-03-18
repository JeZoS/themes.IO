import {
  Button,
  makeStyles,
  Modal,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch } from "react-redux";
import { editTheme } from "../../actions/themeActions";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
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
//
//
//
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//
//
//
const Mod = ({ openM, closeModal, element }) => {
  const [modalImage, setModalImage] = useState(null);
  const [title, setTitle] = useState(element.title);
  const [platform, setPlatform] = useState(element.platform);
  const [creater, setCreater] = useState(element.creator);
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
      setOpen(false);
    }, [1000]);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

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

      try {
        dispatch(editTheme(fd, element._id));
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={err ? "error" : "success"}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </Modal>
  );
};

export default Mod;
