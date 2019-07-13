import React from 'react'
import axios, { post } from 'axios';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file)
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://localhost:3000/images';
    const formData = new FormData();
    formData.set('title', "from react")
    formData.set('price', "21.99")
    formData.append('imageUrl',file)

    axios({
        method: 'POST',
        url: url,
        data: formData,
        config: {headers: {
            'content-type': 'multipart/form-data'
        }}
    }).then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

    // return  post(url, formData,config)
    //  })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default FileUpload