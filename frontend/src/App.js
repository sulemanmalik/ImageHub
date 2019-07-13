import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import AuthContext from "./components/authentication/AuthContext";
import Orders from "./components/Orders"
import Images from "./components/Images"


const App = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      />
      <Navigation />

      <Switch>
        <Route path="/images" component={Images}/>
        <Route path="/orders" component={Orders}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
