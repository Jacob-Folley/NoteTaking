import React, { useState, useEffect } from "react";
import { Content } from "./content";
import { NewNote } from "./NewNote";
import { SideBar } from "./sidebar";
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "../Fetches/noteFetch";

export const NotesView = () => {
  const user = parseInt(localStorage.getItem("userId"));
  const [newnote, setBoolean] = useState(false);
  const [notes, setNotes] = useState([]);
  const [addnote, setNote] = useState({
    title: "",
    body: "",
    tags: [],
    datetime: Date.now(),
    user_id: user,
  });

  useEffect(() => {
    getNotes().then((data) => {
      setNotes(data);
    });
  }, []);

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
              onClick={(evt) => {
                setBoolean(false);

                const note = {
                  title: addnote.title,
                  body: addnote.body,
                  tags: addnote.tags,
                  datetime: addnote.datetime,
                  user_id: addnote.user_id,
                };
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
