import React, { useState } from "react";
import noteContext from "./noteContext";
import Spinner from "../../components/Spinner";

const NoteState = (props) => {
  const s1 = [];
  const [notes, setnotes] = useState(s1);

  const [loading, setloading] = useState(false);

  const getNotes = async () => {
    setloading(true);
    const response = await fetch(
      `https://doc-ex.vercel.app/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setnotes(json);
    setloading(false);
  };

  const addNote = async (title, description) => {
    setloading(true);
    const response = await fetch(
      `https://doc-ex.vercel.app/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );
    console.log(response.json);
    getNotes();
    setloading(false);
  };

  const deleteNote = async (id) => {
    setloading(true);
    const response = await fetch(
      `https://doc-ex.vercel.app/api/notes/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.json);
    getNotes();
    setloading(false);
  };

  const editNote = async (id, title, description) => {
    setloading(true);
    const response = await fetch(
      `https://doc-ex.vercel.app/api/notes/update/${id}`,
      {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );
    console.log(response.json);
    getNotes();
    setloading(false);
  };

  return (
    <>
      {loading && <Spinner />}
      <noteContext.Provider
        value={{ notes, setnotes, addNote, deleteNote, getNotes, editNote }}
      >
        {props.children}
      </noteContext.Provider>
    </>
  );
};

export default NoteState;
