import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";

function Alert() {
    const contextObj = useContext(NoteContext);
    return (
        contextObj.alert && <div className="alert alert-primary" role="alert">
            {contextObj.message}
        </div>
    )
}

export default Alert;