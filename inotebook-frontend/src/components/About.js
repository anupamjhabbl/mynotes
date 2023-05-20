import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

function About(){
    const a = useContext(NoteContext);

    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    },[]);
    
    return (
        <div className="About">
            <h1 className="text-center">About component {a.state.name} and {a.state.class}</h1>
        </div>
    )
}

export default About;