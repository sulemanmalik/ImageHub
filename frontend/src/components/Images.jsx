import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./authentication/AuthContext";
import FileUpload from "./FileUpload";

const Images = () => {
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
  return (
    <div>
      <h1>Images</h1>
      {data.images.map(image => (
        <div key={image._id}>
          <p>
            {image.title} - {image.price}
          </p>
        </div>
      ))}
      <FileUpload />
    </div>
  );
};

export default Images;
