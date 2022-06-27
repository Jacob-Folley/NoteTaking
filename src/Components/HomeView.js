import React from "react";
import { NotesView } from "./Layout/notesView";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Route, Redirect } from "react-router-dom";

export const HomeView = () => {
  // VARIABLES
  //----------------------------------------------------------------

  // USE STATES
  //----------------------------------------------------------------

  // USE EFFECTS
  //----------------------------------------------------------------

  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("lu_token")) {
            return (
              <>
                <NotesView />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </>
  );
};
