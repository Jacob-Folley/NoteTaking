import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "../Fetches/noteFetch";

export const NewNote = () => {
  const user = parseInt(localStorage.getItem("userId"));
  const history = useHistory();

  const [addnote, setNote] = useState({
    title: "",
    body: "",
    tags: [],
    datetime: Date.now(),
    user_id: user,
  });

  const changeFormState = (domEvent) => {
    const copy = { ...addnote };
    copy[domEvent.target.name] = domEvent.target.value;
    setNote(copy);
  };

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
        }}
      >
        Save
      </button>
    </>
  );
};
