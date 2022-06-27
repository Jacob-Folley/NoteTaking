export const getNotes = () => {
  return fetch("http://localhost:8000/notes", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const createNote = (note) => {
  return fetch("http://localhost:8000/notes", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  }).then((res) => res.json());
};

export const getNote = (noteId) => {
  return fetch(`http://localhost:8000/notes/${noteId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((res) => res.json());
};

export const updateNote = (note) => {
  return fetch(`http://localhost:8000/notes/${note.id}`, {
    method: "Put",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

export const deleteNote = (noteId) => {
  return fetch(`http://localhost:8000/notes/${noteId}`, {
    method: "Delete",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  });
};
