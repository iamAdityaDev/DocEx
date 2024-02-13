import React, {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = []
    const [notes, setnotes] = useState(s1)

    const getNotes=async()=>{
      const response=await fetch(`http://localhost:4000/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      })
      const json=await response.json()
      setnotes(json)
    }

    const addNote=async(title, description)=>{
      const response=await fetch(`http://localhost:4000/api/notes/addnote`,{
        method:'POST',
        headers:{
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({title, description})
      })
      console.log(response.json)
      getNotes()
    }

    const deleteNote=async(id)=>{
      const response=await fetch(`http://localhost:4000/api/notes/delete/${id}`,{
        method:'DELETE',
        headers:{
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
      })
      console.log(response.json)
      getNotes()
    }

    const editNote=async(id, title, description)=>{
      const response=await fetch(`http://localhost:4000/api/notes/update/${id}`,{
        method:'PUT',
        headers:{
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({title, description})
      })
      console.log(response.json)
      getNotes()
    }

    return (
        <noteContext.Provider value={{notes, setnotes,addNote,deleteNote, getNotes, editNote}}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;