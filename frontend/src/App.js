import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import AuthContext from "./components/authentication/AuthContext";
import Orders from "./components/Orders";
import Images from "./components/Images";
import Home from "./components/Home";
import Login from "./components/authentication/Login";

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
        {/* {!token && <Redirect from="/" to="/home" exact />}
        {!token && <Route path="/home" component={Home} />}
        {!token && <Route path="/login" component={Login} />}

        {!token && <Route path="/images" component={Login} />}

        {token && <Route path="/images" component={Images} />}
        {token && <Route path="/orders" component={Orders} />} */}

        <Route path="/images" component={Images} />
        <Route path="/orders" component={Orders} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
