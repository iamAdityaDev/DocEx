import React, { useContext,useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "../css_files/home.css";
import "../css_files/add_note.css";
import Notes from "./Notes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Home = () => {
  const navigate = useNavigate();
  const [note, setnote] = useState({title:"", description:""})
  const [user, setUser] = useState('fetching user...');

  const context=useContext(noteContext)
  const {addNote,getNotes}=context

  useEffect(() => {
    // eslint-disable-next-line
    const fetchData = async () => {
      try {
        close_logout_modal();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        // console.log(json.docex_id);
        setUser(json.docex_id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
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

  const open_logout_div=()=>{
    let logout=document.getElementById('logout_user_id')
    logout.style.display="flex"
  }
  const close_logout_modal=()=>{
    let logout=document.getElementById('logout_user_id')
    logout.style.display="none"
  }

  const logout_karo=()=>{
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

        <AccountCircleIcon onClick={open_logout_div} sx={{ fontSize: 32 }} className="user_icon"/>
        <div id="logout_user_id" className="logout_user">
          <p id="user_name_text_id" className="user_name"><AccountCircleIcon className="user_open_div"/>{user} <CloseIcon onClick={close_logout_modal} sx={{ fontSize: 20 }} id="close_logout_id" className="close_logout_div"/></p>
          <button onClick={logout_karo} className="logout_but"><LogoutIcon sx={{ fontSize: 21 }} className="logout_icon"/>Logout</button>
        </div>
        <Notes />

      </div>
    </>
  );
};

export default Home;
