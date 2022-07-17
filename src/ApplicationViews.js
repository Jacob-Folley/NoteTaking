import React from "react";
import { Route } from "react-router-dom";
import { HomeView } from "./Components/HomeView";
import { Login } from "./Components/auth/Login";
import { Register } from "./Components/auth/Register";
import { Notes } from "./Components/Notes";
import { Note } from "./Components/Note";
import { Tasks } from "./Components/Tasks";

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

      <Route exact path="/notes">
        <Notes />
      </Route>
      <Route exact path="/notes/:notesId">
        <Note />
      </Route>
      <Route exact path="/tasks">
        <Tasks />
      </Route>
    </>
  );
};

export default ApplicationViews;
