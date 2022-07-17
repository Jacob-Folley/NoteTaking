import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "./Fetches/tasksFetch";

export const Tasks = () => {
  const user = parseInt(localStorage.getItem("userId"));
  const history = useHistory();
  const locale = "en";

  const [tasks, setTasks] = useState([]);
  const [today, setDate] = useState(new Date());
  const [newTask, setTaskBoolean] = useState(false);
  const [addtask, setTask] = useState({
    title: "",
    body: "",
    datetime: Date.now(),
    user_id: user,
  });

  useEffect(() => {
    retrieveTasks();
  }, []);

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

  const changeTaskState = (domEvent) => {
    const copy = { ...addtask };
    copy[domEvent.target.name] = domEvent.target.value;
    setTask(copy);
  };

  return (
    <>
      <div className="">
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
    </>
  );
};
