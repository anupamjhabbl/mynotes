import Notes from './Notes';
import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function Home() {
    const contextObj = useContext(NoteContext);
    const [note, setNote] = useState({"title":"", "description":"", "tag":""})

    const addNoteHandle = (e) => {
    //    e.preventDefault();
       contextObj.addNote(note.title, note.description, note.tag);
    }

    const onChangeMethod = (e) => {
        setNote({...note, [e.target.name]:e.target.value});
    }

    return (
        <div className="Home container">
            <div className="notes_form">
                <h1 className="my-3">Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="note_title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="note_title" name="title" aria-describedby="emailHelp" onChange={onChangeMethod} required />
                        <div id="emailHelp" className="form-text">Your title must be unique from other title</div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="note_description" name="description" style={{ "height": "200px" }} onChange={onChangeMethod}></textarea>
                            <label htmlFor="note_description">Comments</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="note_tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="note_tag" name="tag" onChange={onChangeMethod}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={addNoteHandle}>Add Note</button>
                </form>
            </div>
            <Notes/>
        </div>
    )
}

export default Home;