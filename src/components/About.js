import React, {useEffect, useContext } from "react";
import noteContext from '../context/notes/noteContext';
import "../css_files/about.css";

const About = () => {
    const a = useContext(noteContext);

    useEffect(()=>{
        a.update()
        // eslint-disable-next-line
    },[])

    return (
        <div>
            This is about {a.state.name}
        </div>
    );
};


export default About;