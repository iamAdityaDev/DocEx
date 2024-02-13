import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import "../css_files/note_item.css";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';


const Noteitem=(props)=>{
    const context=useContext(noteContext)
    // eslint-disable-next-line
    const {deleteNote}=context
    const {note, updatenote, delete_kar}=props

    return (
        <>
    
        <div className="box_note_item">
            <div className="horizontal_box_note_item">
                <p className="note_box_title">{note.title.length > 20 ? note.title.substring(0, 20) + '...' : note.title}</p>
                <EditNoteIcon onClick={()=>updatenote(note)} sx={{ fontSize: 37 }} className="icon_note_item"/>
                <DeleteIcon onClick={()=>delete_kar(note)} sx={{ fontSize: 28 }} className="icon_note_item"/>
                {/* <DeleteIcon onClick={()=>{deleteNote(note._id)}} sx={{ fontSize: 28 }} className="icon_note_item"/> */}
            </div>
            <p className="note_box_desc">{note.description.length > 180 ? note.description.substring(0, 169) + '...' : note.description}</p>
        </div>
        </>
    )
}

export default Noteitem