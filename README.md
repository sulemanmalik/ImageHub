# ImageHub 🌇
Welcome to ImageHub, a repository for mangaing your images! ImageHub is built using MongoDB, Express, React and Node for a smooth dev experinece and ease of use.


### Running the application 🏃🏻‍♀️
1. Clone the application to your machine with `https://github.com/sulemanmalik/ImageHub.git`
2. Start the backend server which will run on `localhost:3000` by navigating to the root of the project and running `yarn start`
3. Start the backend server wich will run on `localhost:3001`by navigating to the root of the project and then to `frontend/` and running `yarn start`.
4. Navigate to `localhost:3001` in your browser and start using ImageHub

### API 🚀
The Rest API exposes several endpoints which can be used to manage images, users and orders.

#### Retrieve all images

| Parameters | Description |
| ---     |         --- |
| URL | `/images` |
| Method | `GET` |
| URL params | n/a |
| Data params | n/a |

Sample Call 
```
axios.get('http://localhost:3000/images')
```

#### Upload a new image
| Parameters | Description |
| ---     |         --- |
| URL | `/images` |
| Method | `POST` |
| URL params | n/a |
| Data params | form data {title, price, imageURL} |
Sample Call 
```
axios({
        method: "POST",
        mode: "no-cors",
        url: "http://localhost:3000/images",
        data: formData,
        config: {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      });
```

#### Retrieve a single image

| Parameters | Description |
| ---     |         --- |
| URL | `/images:imageId` |
| Method | `GET` |
| URL params | :imageId |
| Data params | n/a |

Sample Call 
```
axios.get('http://localhost:3000/images/:imageId')
```

#### Edit the properties of an image

| Parameters | Description |
| ---     |         --- |
| URL | `/images:imageId` |
| Method | `PATCH` |
| URL params | :imageId |
| Data params | `[{"property": "title" || "price", "value": "new value"}]`|

Sample Call 
```
axios({
        method: "PATCH",
        mode: "no-cors",
        url: "http://localhost:3000/images",
        data: [{"property": "title" || "price", "value": "new value"}],
        config: {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      });
```
#### Delete an image
| Parameters | Description |
| ---     |         --- |
| URL | `/images:imageId` |
| Method | `DELETE` |
| URL params | :imageId |
| Data params | n/a |

Sample Call 
```
axios.delete('http://localhost:3000/images/:id')
```






