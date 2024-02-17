import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./NoteItem";
import "../css_files/notes.css";
import "../css_files/note_item.css";
import "../css_files/delete_note.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;
  const navigate = useNavigate();

  const [note_id, setnote_id] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      close_delete();
      getNotes();
    } else {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);
  const [enote, esetnote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
  });

  const updatenote = (note) => {
    let modal = document.getElementById("emodal_add_note_id");
    let back = document.getElementById("eback_for_add_note_id");
    modal.style.display = "flex";
    back.style.display = "flex";
    esetnote({
      eid: note._id,
      etitle: note.title,
      edescription: note.description,
    });
  };

  const handleclick_edit = (e) => {
    e.preventDefault();
    editNote(enote.eid, enote.etitle, enote.edescription);
    // console.log(enote.eid)
    let modal = document.getElementById("emodal_add_note_id");
    let back = document.getElementById("eback_for_add_note_id");
    modal.style.display = "none";
    back.style.display = "none";
  };

  const onchange_edit = (e) => {
    esetnote({ ...enote, [e.target.name]: e.target.value });
  };

  const close_edit_note = () => {
    let modal = document.getElementById("emodal_add_note_id");
    let back = document.getElementById("eback_for_add_note_id");
    modal.style.display = "none";
    back.style.display = "none";
  };

  const delete_kar = (note) => {
    setnote_id(note._id);
    let modal = document.getElementById("delete_modal_id");
    let back = document.getElementById("back_for_delete_note_id");
    modal.style.display = "flex";
    back.style.display = "flex";

    // let button = document.getElementById("abcd");
    // button.addEventListener("click", function () {
    //   deleteNote(note._id);
    //   getNotes();
    //   // close_delete();
    // });
    // let button_cancel = document.getElementById("delete_mat_kar");
    // button_cancel.addEventListener("click", function () {
    //   getNotes();
    //   // close_delete();
    // });
  };
  const close_delete = () => {
    let modal = document.getElementById("delete_modal_id");
    let back = document.getElementById("back_for_delete_note_id");
    modal.style.display = "none";
    back.style.display = "none";
  };
  const delete_hojao = () => {
    deleteNote(note_id);
    getNotes();
    close_delete();
  };
  const delete_nhi = () => {
    getNotes();
    close_delete();
  };
  return (
    <>
      <div id="back_for_delete_note_id" className="back_for_delete_note"></div>
      <div className="back_support_delete">
        <div id="delete_modal_id" className="delete_modal">
          <p className="delete_message_note">
            Are you sure you want to delete the note ?
          </p>
          <div className="delete_buttons_div">
            <button
              onClick={delete_nhi}
              id="delete_mat_kar"
              className="cancel_delete"
            >
              Cancel
            </button>
            <button onClick={delete_hojao} id="abcd" className="delete_delete">
              Delete
            </button>
          </div>
        </div>
      </div>

      <div id="eback_for_add_note_id" className="eback_for_add_note"></div>
      <div className="emodal_note_back_support">
        <form id="emodal_add_note_id" className="emodal_add_note">
          <CloseIcon onClick={close_edit_note} className="eclose_add_note" />
          <div className="emodal_add_note_div">
            <input
              onChange={onchange_edit}
              className="etitle_add_note"
              type="text"
              id="etitle"
              name="etitle"
              value={enote.etitle}
              placeholder="Title"
            />
            <textarea
              onChange={onchange_edit}
              className="edesc_add_note"
              id="edescription"
              name="edescription"
              value={enote.edescription}
              placeholder="Write here..."
            ></textarea>
          </div>
          <button onClick={handleclick_edit} className="eadd_but_add_note">
            Update Note
          </button>
        </form>
      </div>

      <div className="below_part_add_note">
        <p className="created_head">Created Notes</p>

        <div className="container_notes_created">
          {notes.map((note) => {
            return (
              <Noteitem
                key={note._id}
                note={note}
                updatenote={updatenote}
                delete_kar={delete_kar}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Notes;
