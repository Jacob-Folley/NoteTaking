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
  // VARIABLES
  const user = parseInt(localStorage.getItem("userId"));
  const history = useHistory();

  //STATES
  const [edit, setEdit] = useState(false);
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

  // USE EFFECTS
  //------------------------------------------------------------------------------------

  // FETCHES ALL NOTES THEN SETS IT TO 'notes'
  useEffect(() => {
    retrieveNotes();
  }, []);

  // CALLS A FUNCTION THAT GETS A SINGLE NOTE BY ID THEN SETS IT TO 'note'
  useEffect(() => {
    retrieveNote(noteId);
  }, [noteId]);

  // GOES THROUGH ALL THE NOTES AND ONLY RETURNS THE NOTES OF CURRENT USER
  useEffect(() => {
    filterNotes();
  }, [notes]);

  // FUNCTIONS
  //------------------------------------------------------------------------------------

  // CHANGES INPUT THAT IS BEING ENTERED INTO THE FORM
  const changeFormState = (domEvent) => {
    const copy = { ...addnote };
    copy[domEvent.target.name] = domEvent.target.value;
    setAddNote(copy);
  };

  const getLastNote = () => {
    return usernotes.length - 1;
  };

  // GETS ALL NOTES AND SETS IT TO 'notes'
  const retrieveNotes = () => {
    getNotes().then((data) => {
      setNotes(data);
    });
  };

  // GETS A SINGLE NOTE AND SETS IT TO 'note'
  const retrieveNote = (id) => {
    getNote(id).then((data) => {
      setNote(data);
    });
  };

  // DISPLAYS THE NOTE THAT IS SELECTED
  const noteRetrieved = () => {
    return (
      <>
        <h1>{note.title}</h1>
        <p>{note.tags}</p>
        <p>{note.body}</p>
        <button
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteNote(noteId).then(retrieveNotes());
            setNoteId(0);
          }}
        >
          Delete
        </button>
      </>
    );
  };

  // FILTERS NOTES TO GET ONLY CURRENT USER NOTES
  const filterNotes = () => {
    setUserNotes(
      notes.filter((note) => {
        return note.user_id.id == user;
      })
    );
  };

  // DISPLAYS THE FORM FOR A NEW NOTE
  const newNote = () => {
    return (
      <>
        {/* TITLE */}
        <input
          name="title"
          placeholder="Title"
          onChange={changeFormState}
        ></input>
        {/* TAGS */}
        <input placeholder="Tags"></input>
        {/* DATETIME */}
        <p>{Date.now()}</p>
        {/* BODY */}
        <textarea
          name="body"
          placeholder="NewNote"
          onChange={changeFormState}
        ></textarea>
        {/* SAVE BUTTON */}
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

            createNote(note).then(() => {
              retrieveNotes()
                .then(filterNotes())
                .then(() => {
                  setNoteId(usernotes[getLastNote()].id);
                });
            });
            setBoolean(false);
          }}
        >
          Save
        </button>
      </>
    );
  };

  // DISPLAYS THE FORM TO EDIT A NOTE
  const editNote = () => {
    return (
      <>
        <input
          name="title"
          placeholder="Title"
          defaultValue={note.title}
          onChange={changeFormState}
        />
        <input placeholder="Tags"></input>
        <p>{Date.now()}</p>
        <textarea
          name="body"
          placeholder="NewNote"
          defaultValue={note.body}
          onChange={changeFormState}
        />
        <button
          onClick={(evt) => {
            evt.preventDefault();

            const editnote = {
              id: noteId,
              title: addnote.title == "" ? note.title : addnote.title,
              body: addnote.body == "" ? note.body : addnote.body,
              tags: addnote.tags,
              datetime: note.datetime,
              user_id: user,
            };

            updateNote(editnote).then(() => history.push("/"));
            retrieveNotes();
            setEdit(false);
            setBoolean(false);
          }}
        >
          Save
        </button>
      </>
    );
  };

  // DISPLAYS THE NOTE WHEN NOTHING IS SELECTED
  const Content = () => {
    if (usernotes.length > 0) {
      return (
        <>
          <h1>{usernotes[usernotes.length - 1].title}</h1>
          <p>{usernotes[usernotes.length - 1].tags}</p>
          <p>{usernotes[usernotes.length - 1].body}</p>
          <button
            onClick={() => {
              setNoteId(usernotes[usernotes.length - 1].id);
              setEdit(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteNote(usernotes[usernotes.length - 1].id).then(() => {
                retrieveNotes()
                  .then(filterNotes())
                  .then(() => {
                    setNoteId(usernotes[getLastNote()].id);
                  });
              });
            }}
          >
            Delete
          </button>
        </>
      );
    } else {
      return "";
    }
  };

  // CHECKS THE STATE OF WHAT CONTENT NEEDS TO BE DISPLAYED
  const contentState = () => {
    return edit == true
      ? editNote()
      : newnote
      ? newNote()
      : noteId < 1
      ? Content()
      : noteRetrieved();
  };

  // RETURN
  //------------------------------------------------------------------------------------

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
          {/* NEW NOTE BUTTON */}
          <button
            onClick={() => {
              setBoolean(true);
            }}
          >
            Add Note
          </button>
          {/* SORTING FUNCTIONS*/}
          <h1>Notes</h1>
          <input placeholder="Search"></input>
          <p>sort</p>
          <select>
            <option>newest</option>
            <option>oldest</option>
          </select>

          {/* LIST OF NOTES */}
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

        <div className="content">{contentState()}</div>
      </div>
    </>
  );
};
