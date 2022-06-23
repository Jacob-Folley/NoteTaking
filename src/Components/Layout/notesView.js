import React from "react";

export const NotesView = () => {
  return (
    <>
      <h1>Notes</h1>
      <input placeholder="Search"></input>
      <p>sort</p>
      <select>
        <option>newest</option>
        <option>oldest</option>
      </select>
    </>
  );
};
