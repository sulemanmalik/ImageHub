import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authentication/AuthContext";
import FileUpload from "./FileUpload";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const Images = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

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

  const deleteImageHandler = async (event) => {
    const imageId = event.currentTarget.value
    try {
      const url = "http://localhost:3000/images/"+imageId;
      const response = await axios({
        method: "DELETE",
        mode: 'no-cors',
        url: url,
      })

    } catch (err) {

    }
    // const deleteImage = async () => {
    //   console.log()
    // }
  }
  return (
    <Grid
      container
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1>Images</h1>
      {data.images.map(image => (
        <Card style={{ margin: 10, width: 250 }} key={image._id}>
          <p>
            {image.title} - {image.price}
          </p>
          <IconButton aria-label="Delete" className={classes.margin} onClick={deleteImageHandler} value={image._id}>
            <DeleteIcon />
          </IconButton>

          <img
            src={"http://localhost:3000/" + image.imageURL}
            style={{ height: 150, width: "auto" }}
            alt=""
          />
        </Card>
      ))}
      <FileUpload />
    </Grid>
  );
};

export default Images;
