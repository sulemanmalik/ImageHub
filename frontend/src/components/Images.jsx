import React, { useState, useEffect } from "react";
import axios from "axios";

const Images = () => {
  const [data, setData] = useState([]);
  let baseurl = "http://localhost:3000";

  const fetchImages = async () => {
    const response = await fetch(baseurl + "/images");
    const json = await response.json();
    setData(json);
  };

  const fetchImagesAxios = async () => {
    const result = await axios.get(baseurl + "/images");
    setData(result.data);
  };

  useEffect(() => {
    fetchImagesAxios();
  }, []);

  if (!data.images) {
    return null;
  } else {
    console.log(data.images);
  }
  return (
    <div>
      {data.images.map(image => (
        <div key={image._id}>
          <p>{image.title} - {image.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Images;
