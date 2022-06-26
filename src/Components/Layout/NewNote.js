import React from "react";

export const NewNote = () => {
  return (
    <>
      <input placeholder="Title"></input>
      <input placeholder="Tags"></input>
      <p>{Date.now()}</p>
      <textarea placeholder="NewNote"></textarea>
    </>
  );
};
