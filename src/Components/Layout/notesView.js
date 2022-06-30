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
  const [noteId, setNoteId] = useState(0);
  const [newnote, setBoolean] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [usernotes, setUserNotes] = useState([]);
  const [addnote, setAddNote] = useState({
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
    retrieveNote(noteId);
  }, [noteId]);

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
    setAddNote(copy);
  };

  const retrieveNotes = () => {
    getNotes().then((data) => {
      setNotes(data);
    });
  };

  const retrieveNote = (id) => {
    getNote(id).then((data) => {
      setNote(data);
    });
  };

  const noteRetrieved = () => {
    return (
      <>
        <h1>{note.title}</h1>
        <p>{note.tags}</p>
        <p>{note.body}</p>
        <button>Edit</button>
        <button>Delete</button>
      </>
    );
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

  // const editNote = () => {
  //   return (
  //     <>
  //       <input
  //         name="title"
  //         placeholder="Title"
  //         onChange={changeFormState}
  //       >{note.title}</input>
  //       <input placeholder="Tags"></input>
  //       <p>{Date.now()}</p>
  //       <textarea
  //         name="body"
  //         placeholder="NewNote"
  //         onChange={changeFormState}
  //       >{note.body}</textarea>
  //       <button
  //         onClick={(evt) => {
  //           evt.preventDefault();

  //           const note = {
  //             title: addnote.title,
  //             body: addnote.body,
  //             tags: addnote.tags,
  //             datetime: addnote.datetime,
  //             user_id: addnote.user_id,
  //           };

  //           updateNote(note).then(() => history.push("/"));
  //           retrieveNotes();
  //           setBoolean(false);
  //         }}
  //       >
  //         Save
  //       </button>
  //     </>
  //   );
  // };

  const Content = () => {
    if (usernotes.length > 0) {
      return (
        <>
          <h1>{usernotes[usernotes.length - 1].title}</h1>
          <p>{usernotes[usernotes.length - 1].tags}</p>
          <p>{usernotes[usernotes.length - 1].body}</p>
          <button>Edit</button>
          <button>Delete</button>
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
        {/* -------------------------------------------------------------------------------- */}

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
                    <h1
                      onClick={() => {
                        setNoteId(note.id);
                      }}
                    >
                      {note.title}
                    </h1>
                    <p>{note.datetime}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {/* -------------------------------------------------------------------------------- */}

        {/* Content */}
        <div className="content">
          {newnote ? newNote() : noteId < 1 ? Content() : noteRetrieved()}
        </div>
      </div>
    </>
  );
};
