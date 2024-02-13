import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "../css_files/home.css";
import "../css_files/add_note.css";
import Notes from "./Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const navigate = useNavigate();
  const [note, setnote] = useState({title:"", description:""})

  const context=useContext(noteContext)
  const {addNote,getNotes}=context

  const handleclick=(e)=>{
    let modal=document.getElementById('modal_add_note_id')
    let back=document.getElementById('back_for_add_note_id')
    modal.style.display="none"
    back.style.display="none"
    e.preventDefault()
    addNote(note.title, note.description)
    getNotes()
  }

  const onchange=(e)=>{
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  const go_to_add_note = () => {
    let modal=document.getElementById('modal_add_note_id')
    let back=document.getElementById('back_for_add_note_id')
    modal.style.display="flex"
    back.style.display="flex"
  };

  const close_add_note=()=>{
    let modal=document.getElementById('modal_add_note_id')
    let back=document.getElementById('back_for_add_note_id')
    modal.style.display="none"
    back.style.display="none"
  }
  const logout_func=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
    <Navbar/>
     <div id="back_for_add_note_id" className="back_for_add_note"></div>
     <div className="back_support_add_note">
        <form id="modal_add_note_id" className="modal_add_note">
            <CloseIcon onClick={close_add_note} className="close_add_note"/>
            <div className="modal_add_note_div">
                <input onChange={onchange} className="title_add_note" type="text" id="title" name="title" placeholder="Title"/>
                <textarea onChange={onchange} className="desc_add_note" id="description" name="description" placeholder="Write here..."></textarea>
            </div>
            <button onClick={handleclick} className="add_but_add_note">Add Note</button>
        </form>
      </div>

      <div className="parent_div_add_note">
        <div className="upper_div_add_note">
          <div className="left_add_note_div">
              <button onClick={go_to_add_note} className="add_note">
                Add Note
                <AddCircleIcon sx={{ fontSize: 40 }} className="add_icon" />
              </button>
              <p className="but_footer">
                Start adding notes today to unlock a more organized and efficient way of
                capturing your thoughts!
              </p>
            </div>
            <div className="content_adding_note">
              <p className="adding_note_head">Adding a Note</p>
              <p className="point">Every note begins with a title.</p>
              <p className="point">
                The description is where you elaborate on the content of your note.
              </p>
              <p className="point">
                Tags are like labels that you can attach to your note to categorize
                and organize it alongside similar notes.
              </p>
            </div>
        </div>

        <button onClick={logout_func} className="logout_but"><LogoutIcon className="logout_icon"/>Logout</button>
        <button onClick={logout_func} className="logout_but_two"><LogoutIcon className="logout_icon_two"/></button>
        <Notes />

      </div>
    </>
  );
};

export default Home;
