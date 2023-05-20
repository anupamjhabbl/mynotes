import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {
    const s1 = {
        "name":"Anupam kumar",
        "class":"5b"
    }

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(()=>{
            setState({
                "name":"Sundram Kumar",
                "class":"10b"
            })
        },1000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;