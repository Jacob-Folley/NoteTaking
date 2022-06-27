import React from "react";
import { Route } from "react-router-dom";
import { HomeView } from "./Components/HomeView";
import { Login } from "./Components/auth/Login";
import { Register } from "./Components/auth/Register";

const ApplicationViews = () => {
  // VARIABLES
  //----------------------------------------------------------------

  // USE STATES
  //----------------------------------------------------------------

  // USE EFFECTS
  //----------------------------------------------------------------

  return (
    <>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>

      <Route exact path="/">
        <HomeView />
      </Route>
    </>
  );
};

export default ApplicationViews;
