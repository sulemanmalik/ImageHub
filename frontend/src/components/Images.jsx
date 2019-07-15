import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authentication/AuthContext";
import FileUpload from "./FileUpload";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Grid, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import Modal from "./Modal";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  paper: {
    position: "absolute",
    backgroundColor: "white",
    padding: 40
  }
});

const Images = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [discount, setDiscount] = useState();
  const [name, setName] = useState();

  let baseurl = "http://localhost:3000";

  const fetchImages = async () => {
    const result = await axios.get(baseurl + "/images");
    setData(result.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!data.images) {
    return null;
  } else {
    console.log(data.images);
  }

  const deleteImageHandler = async event => {
    const imageId = event.currentTarget.value;
    const url = "http://localhost:3000/images/" + imageId;
    try {
      const response = await axios({
        method: "DELETE",
        mode: "no-cors",
        url: url
      });
    } catch (err) {
      throw err;
    }
  };

  const editImageHandler = async event => {
    const imageId = event.currentTarget.value;
    // const url = "http://localhost:3000/images/" + imageId;
    // console.log(imageId);

    console.log(imageId)

    // try {
    //   const response = await axios({
    //     method: "PATCH",
    //     mode: "no-cors",
    //     url: url
    //   });
    // } catch (err) {
    //   throw err;
    // }
  };

  const clickImageHandler = imageURL => {
    const newURL = "http://localhost:3000/" + imageURL;
    window.open(newURL, "_blank");
    console.log(newURL);
  };
  return (
    <Grid
      container
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1>Images</h1>

      <FileUpload />

      <Grid container direction="row">
        {data.images.map(image => (
          <Card style={{ margin: 15, width: 300, padding: 20 }} key={image._id}>
            <Grid
              container
              display="flex"
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="h6" gutterBottom>
                <strong>{image.title}</strong> -{" "}
                <span style={{ color: "green" }}>$ {image.price}</span>
              </Typography>

              <br />

              <label>Discount %</label>
              <input onChange={editImageHandler} />

              <label>New name</label>
              <input onChange={e => console.log(image._id)}/>
              {console.log("STATE:", name)}

              <Button onClick={editImageHandler}>submit</Button>

              <IconButton
                aria-label="Delete"
                className={classes.margin}
                onClick={deleteImageHandler}
                value={image._id}
              >
                <DeleteIcon />
              </IconButton>

              <img
                src={"http://localhost:3000/" + image.imageURL}
                style={{ height: 150, width: "auto" }}
                alt=""
                onClick={() => clickImageHandler(image.imageURL)}
              />
            </Grid>
          </Card>
        ))}
        
      </Grid>
    </Grid>
  );
};

export default Images;
