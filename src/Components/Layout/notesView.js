import React, { useState, useEffect } from "react";
import { Content } from "./content";
import { NewNote } from "./NewNote";
import { SideBar } from "./sidebar";

export const NotesView = () => {
  const [newnote, setBoolean] = useState(false);

  return (
    <>
      <div className="layoutContainer">
        {/* SideBar */}
        <div className="sidebar">
          <SideBar />
        </div>
        {/* NotesView */}
        <div className="notesview">
          <button
            onClick={() => {
              setBoolean(true);
            }}
          >
            Add Note
          </button>
          <h1>Notes</h1>
          <input placeholder="Search"></input>
          <p>sort</p>
          <select>
            <option>newest</option>
            <option>oldest</option>
          </select>
        </div>
        {/* Content */}
        <div className="content">
          {newnote ? <NewNote /> : <Content />}
          {newnote ? (
            <button
              onClick={() => {
                setBoolean(false);
              }}
            >
              Save
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
