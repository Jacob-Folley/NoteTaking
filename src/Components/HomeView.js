import React from "react";
import { SideBar } from "./Layout/sidebar";
import { NotesView } from "./Layout/notesView";
import { Content } from "./Layout/content";

export const HomeView = () => {
  // VARIABLES
  //----------------------------------------------------------------

  // USE STATES
  //----------------------------------------------------------------

  // USE EFFECTS
  //----------------------------------------------------------------

  return (
    <>
      <div className="layoutContainer">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="notesview">
          <NotesView />
        </div>
        <div className="content">
          <Content />
        </div>
      </div>
    </>
  );
};
