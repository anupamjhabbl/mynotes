import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";

function Alert() {
    const contextObj = useContext(NoteContext);
    return (
        contextObj.alert && <div className="alert alert-primary" role="alert" style={{"position":"fixed","display":"block","width":"100%"}}>
            {contextObj.message}
        </div>
    )
}

export default Alert;