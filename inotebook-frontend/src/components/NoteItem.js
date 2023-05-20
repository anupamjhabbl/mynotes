import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const contextObj = useContext(NoteContext);

    const deleteNoteHandle = (e) => {
        contextObj.deleteNote(props.id);
    }

    const editNoteHandle = (e) => {
        console.log("okay");
        contextObj.editNote(props.id,"anupam's title","updated context", "djjjd");
    }

    return (
        <div className="col-lg-3 col-md-4 my-3 col-sm-6 container-fluid">
            <div className="card" style={{"width": "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <button type="button" className="btn btn-primary mx-2" onClick={deleteNoteHandle}><i className="fa-solid fa-trash mx-2"></i></button>
                    <button type="button" className="btn btn-primary mx-2" onClick={editNoteHandle}><i className="fa-solid fa-edit mx-2"></i></button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;