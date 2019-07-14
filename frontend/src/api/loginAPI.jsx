import axios from 'axios'

const loginAPI = {
    LOGIN: (email, password, authcontext) => {
      let requestBody = {
            "email": `${email}`,
            "password": `${password}`
      };

      axios.post()

  
      fetch("http://localhost:3000/user/login", {
        method: "POST",
        mode: 'no-cors',
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("failed");
          }
          return res.json();
        })
        .then(resData => {
          if (resData.data.login.token) {
            authcontext.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.tokenExpiration
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  
  export default loginAPI;
  