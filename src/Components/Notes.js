import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "./Fetches/noteFetch";

export const Notes = () => {
  const user = parseInt(localStorage.getItem("userId"));
  const history = useHistory();
  const locale = "en";

  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(0);
  const [newnote, setBoolean] = useState(false);
  const [note, setNote] = useState({});
  const [usernotes, setUserNotes] = useState([]);
  const [sorted, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [today, setDate] = useState(new Date());
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

  useEffect(() => {
    setSort(usernotes);
  }, [usernotes]);

  // CHECKS INPUT IN THE SEARCH BAR TO SEE IF IT MATCHES RESULTS
  useEffect(() => {
    search === ""
      ? retrieveNotes()
      : setNotes(
          notes.filter((note) => {
            return note.title.toLowerCase().includes(search.toLowerCase());
          })
        );
  }, [search]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);

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

  // FILTERS NOTES TO GET ONLY CURRENT USER NOTES
  const filterNotes = () => {
    let filtered = notes.filter((note) => {
      return note.user_id.id == user;
    });
    setUserNotes(
      filtered.sort((a, b) => {
        return b.id - a.id;
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

  const sortOld = () => {
    let notesCopy = usernotes.map((notes) => ({ ...notes }));
    notesCopy.sort((a, b) => {
      return a.id - b.id;
    });
    return setSort(notesCopy);
  };

  const sortNew = () => {
    return setSort(usernotes);
  };

  const searchFunction = () => {
    const foundNote = usernotes.find((usernotes) => {
      return usernotes.title === search;
    });
    if (foundNote) {
      setNoteId(foundNote.id);
    }
  };

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  return (
    <>
      <div className="notesExpand">
        <button
          onClick={() => {
            history.push(`/`);
          }}
        >
          Minimize
        </button>
        <button
          onClick={() => {
            history.push(`/tasks`);
          }}
        >
          Tasks
        </button>
        <button
          onClick={() => {
            setBoolean(true);
          }}
        >
          Add Note
        </button>

        {/* SORTING FUNCTIONS*/}
        <h1>Notes</h1>
        <input
          onChange={(e) => {
            const searchItem = e.target.value;
            setSearch(searchItem);
          }}
          placeholder="Search"
        ></input>

        <p>sort</p>
        <button
          onClick={() => {
            sortNew();
          }}
        >
          newest
        </button>

        <button
          onClick={() => {
            sortOld();
          }}
        >
          oldest
        </button>

        {/* LIST OF NOTES */}
        <div>
          {sorted.map((note) => {
            return (
              <>
                <div>
                  <h1
                    onClick={() => {
                      history.push(`/notes/${note.id}`);
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
    </>
  );
};
