import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "./Fetches/noteFetch";

export const Note = () => {
  const user = parseInt(localStorage.getItem("userId"));
  const history = useHistory();
  const locale = "en";

  const [note, setNote] = useState({});
  const [edit, setEdit] = useState(false);
  const [today, setDate] = useState(new Date());
  const { notesId } = useParams();

  // USE EFFECTS
  //------------------------------------------------------------------------------------

  // CALLS A FUNCTION THAT GETS A SINGLE NOTE BY ID THEN SETS IT TO 'note'
  useEffect(() => {
    retrieveNote(notesId);
  }, []);

  // FUNCTIONS
  //------------------------------------------------------------------------------------

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  // GETS A SINGLE NOTE AND SETS IT TO 'note'
  const retrieveNote = (id) => {
    getNote(id).then((data) => {
      setNote(data);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          history.push(`/`);
        }}
      >
        Minimize
      </button>
      <button
        onClick={() => {
          history.push(`/notes`);
        }}
      >
        Notes
      </button>
      <button
        onClick={() => {
          history.push(`/tasks`);
        }}
      >
        Tasks
      </button>
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
          deleteNote(note.id).then(history.push("/"));
        }}
      >
        Delete
      </button>
    </>
  );
};
