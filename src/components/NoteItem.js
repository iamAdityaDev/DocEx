import React from "react";
// import noteContext from "../context/notes/noteContext";
import "../css_files/note_item.css";
import DeleteIcon from "@mui/icons-material/Delete";

const NoteItem = (props) => {
  //   const context = useContext(noteContext);
  //   const { deleteNote } = context;
  const { note, updatenote, delete_kar } = props;

  return (
    <div className="outside_box">
      <DeleteIcon
        onClick={(event) => {
          event.stopPropagation();
          delete_kar(note);
        }}
        sx={{ fontSize: 28 }}
        className="icon_note_item"
      />

      <div
        id="box_content"
        onClick={() => updatenote(note)}
        className="box_note_item"
      >
        <div className="horizontal_box_note_item">
          <pre className="note_box_title">{note.title}</pre>
        </div>
        <pre className="note_box_desc">{note.description}</pre>
      </div>
    </div>
  );
};

export default NoteItem;
