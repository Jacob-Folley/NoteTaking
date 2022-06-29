import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const [newnote, setBoolean] = useState(false);
  const [notes, setNotes] = useState([]);
  const [usernotes, setUserNotes] = useState([]);
  const [addnote, setNote] = useState({
    title: "",
    body: "",
    tags: "",
    datetime: Date(),
    user_id: user,
  });

  useEffect(() => {
    retrieveNotes();
  }, []);

  useEffect(() => {
    setUserNotes(
      notes.filter((note) => {
        return note.user_id.id == user;
      })
    );
  }, [notes]);

  const changeFormState = (domEvent) => {
    const copy = { ...addnote };
    copy[domEvent.target.name] = domEvent.target.value;
    setNote(copy);
  };

  const retrieveNotes = () => {
    getNotes().then((data) => {
      setNotes(data);
    });
  };

  const newNote = () => {
    return (
      <>
        <input
          name="title"
          placeholder="Title"
          onChange={changeFormState}
        ></input>
        <input placeholder="Tags"></input>
        <p>{Date.now()}</p>
        <textarea
          name="body"
          placeholder="NewNote"
          onChange={changeFormState}
        ></textarea>
        <button
          onClick={(evt) => {
            evt.preventDefault();

            const note = {
              title: addnote.title,
              body: addnote.body,
              tags: addnote.tags,
              datetime: addnote.datetime,
              user_id: addnote.user_id,
            };

            createNote(note).then(() => history.push("/"));
            retrieveNotes();
            setBoolean(false);
          }}
        >
          Save
        </button>
      </>
    );
  };

  const Content = () => {
    if (usernotes.length > 0) {
      return (
        <>
          <h1>{usernotes[usernotes.length - 1].title}</h1>
          <p>{usernotes[usernotes.length - 1].tags}</p>
          <p>{usernotes[usernotes.length - 1].body}</p>
        </>
      );
    } else {
      return "";
    }
  };

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

          <div>
            {usernotes.map((note) => {
              return (
                <>
                  <div>
                    <h1>{note.title}</h1>
                    <p>{note.datetime}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="content">{newnote ? newNote() : Content()}</div>
      </div>
    </>
  );
};
