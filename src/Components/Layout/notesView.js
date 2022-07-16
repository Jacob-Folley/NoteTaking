import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import Datetime from "react-datetime";
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
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../Fetches/tasksFetch";

export const NotesView = () => {
  // VARIABLES
  const user = parseInt(localStorage.getItem("userId"));
  const history = useHistory();
  const locale = "en";

  //STATES
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [newnote, setBoolean] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [usernotes, setUserNotes] = useState([]);
  const [sorted, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [today, setDate] = useState(new Date());
  const [newTask, setTaskBoolean] = useState(false);
  const [addnote, setAddNote] = useState({
    title: "",
    body: "",
    tags: "",
    datetime: Date(),
    user_id: user,
  });
  const [addtask, setTask] = useState({
    title: "",
    body: "",
    datetime: Date.now(),
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
    contentState();
  }, [noteId]);

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

  useEffect(() => {
    retrieveTasks();
  }, []);

  // FUNCTIONS
  //------------------------------------------------------------------------------------

  // CHANGES INPUT THAT IS BEING ENTERED INTO THE FORM
  const changeFormState = (domEvent) => {
    const copy = { ...addnote };
    copy[domEvent.target.name] = domEvent.target.value;
    setAddNote(copy);
  };

  const changeTaskState = (domEvent) => {
    const copy = { ...addtask };
    copy[domEvent.target.name] = domEvent.target.value;
    setTask(copy);
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
            deleteNote(noteId)
              .then(() => {
                setNoteId(0);
              })
              .then(() => {
                retrieveNotes();
              })
              .then(filterNotes());
          }}
        >
          Delete
        </button>
      </>
    );
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

  const newtask = () => {
    return (
      <>
        <input></input>
        <textarea></textarea>
        <button>submit</button>
        <button>cancel</button>
      </>
    );
  };

  const retrieveTasks = () => {
    getTasks().then((data) => {
      setTasks(data);
    });
  };

  // RETURN
  //------------------------------------------------------------------------------------

  return (
    <>
      <div className="layoutContainer">
        {/* SideBar */}

        <div className="sidebar">
          <h1>{date}</h1>
          <p>{time}</p>

          {newTask ? (
            <>
              <input
                name="title"
                placeholder="Title"
                onChange={changeTaskState}
              ></input>
              <textarea
                name="body"
                placeholder="NewNote"
                onChange={changeTaskState}
              ></textarea>
              <button
                onClick={(evt) => {
                  evt.preventDefault();

                  const task = {
                    title: addtask.title,
                    body: addtask.body,
                    tags: addtask.tags,
                    datetime: addtask.datetime,
                    user_id: addtask.user_id,
                  };

                  createTask(task).then(() => retrieveTasks());
                  setTaskBoolean(false);
                }}
              >
                submit
              </button>
              <button
                onClick={() => {
                  setTaskBoolean(false);
                }}
              >
                cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setTaskBoolean(true);
              }}
            >
              new task
            </button>
          )}

          <div>
            {tasks.map((task) => {
              return (
                <>
                  <div>
                    <h1>{task.title}</h1>
                    <p>{task.body}</p>
                    <button
                      onClick={() =>
                        deleteTask(task.id).then(() => retrieveTasks())
                      }
                    ></button>
                  </div>
                </>
              );
            })}
          </div>
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
