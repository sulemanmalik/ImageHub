import React, { useState } from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import { Input, Button, TextField } from "@material-ui/core";

const FileUpload = () => {
  const [file, setFile] = useState();

  const [uploadedFile, setUploadedFile] = useState({});

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();

  const onChange = event => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageURL", file);
    formData.set("title", title);
    formData.set("price", price);

    try {
      const url = "http://localhost:3000/images";
      const response = await axios({
        method: "POST",
        mode: "no-cors",
        url: url,
        data: formData,
        config: {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      });
      const { createdImage } = response.data;
      setUploadedFile({ createdImage });
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <React.Fragment>
      <FormControl>
        <Input type="file" onChange={onChange} />

        <TextField
          id="outlined-name"
          label="Title"
          onChange={e => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-name"
          label="Price"
          onChange={e => setPrice(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </FormControl>
    </React.Fragment>
  );
};

// class FileUpload extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state ={
//       file:null
//     }
//     this.onFormSubmit = this.onFormSubmit.bind(this)
//     this.onChange = this.onChange.bind(this)
//     this.fileUpload = this.fileUpload.bind(this)
//   }
//   onFormSubmit(e){
//     e.preventDefault() // Stop form submit
//     this.fileUpload(this.state.file)
//   }
//   onChange(e) {
//     this.setState({file:e.target.files[0]})
//   }
//   fileUpload(file){
//     const url = 'http://localhost:3000/images';
//     const formData = new FormData();
//     formData.set('title', "from react")
//     formData.set('price', "21.99")
//     formData.append('imageUrl',file)

//     axios({
//         method: 'POST',
//         url: url,
//         data: formData,
//         config: {headers: {
//             'content-type': 'multipart/form-data'
//         }}
//     }).then(function (response) {
//         //handle success
//         console.log(response);
//     })
//     .catch(function (response) {
//         //handle error
//         console.log(response);
//     });

//     // return  post(url, formData,config)
//     //  })
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit} style={{paddingBottom: 40}}>
//         <h1>Image Upload</h1>
//         <input type="file" onChange={this.onChange} />
//         <button type="submit">Upload</button>
//       </form>
//    )
//   }
// }

export default FileUpload;
