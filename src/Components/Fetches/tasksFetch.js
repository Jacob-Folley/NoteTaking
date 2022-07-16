export const getTasks = () => {
  return fetch("http://localhost:8000/tasks", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const createTask = (task) => {
  return fetch("http://localhost:8000/tasks", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
};

export const getTask = (taskId) => {
  return fetch(`http://localhost:8000/notes/${taskId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((res) => res.json());
};

export const updateTask = (task) => {
  return fetch(`http://localhost:8000/tasks/${task.id}`, {
    method: "Put",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = (taskId) => {
  return fetch(`http://localhost:8000/tasks/${taskId}`, {
    method: "Delete",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  });
};
