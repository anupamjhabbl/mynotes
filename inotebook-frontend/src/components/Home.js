import Notes from './Notes';
import { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom';

function Home() {
    const contextObj = useContext(NoteContext);
    const [note, setNote] = useState({"title":"", "description":"", "tag":""});
    const navigate = useNavigate();

    const addNoteHandle = (e) => {
    //    e.preventDefault();
       contextObj.addNote(note.title, note.description, note.tag);
       setNote({"title":"","description":"","tag":""});
    }

    const onChangeMethod = (e) => {
        setNote({...note, [e.target.name]:e.target.value});
    }

    useEffect(()=>{
        // eslint-disable-next-line
        if (!localStorage.getItem("token")){
            navigate('/login');
        }
        else{
            contextObj.fetchNotes();
        }
        // eslint-disable-next-line
    },[])

    return (
        <div className="Home container">
            <div className="notes_form">
                <h1 className="my-3">Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="note_title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="note_title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChangeMethod} required />
                        <div id="emailHelp" className="form-text">Your title must be unique from other title and more than 3 character</div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" value={note.description} id="note_description" name="description" style={{ "height": "200px" }} onChange={onChangeMethod}></textarea>
                            <label htmlFor="note_description">Comments</label>
                            <div id="emailHelp" className="form-text">Your description must be more than 5 character</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="note_tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="note_tag" name="tag" value={note.tag} onChange={onChangeMethod}/>
                    </div>
                    <button type="button" className={`btn btn-primary ${note.title.length<=3 || note.description.length<=5 ? "disabled" : ""}`} onClick={addNoteHandle}>Add Note</button>
                </form>
            </div>
            <Notes />
        </div>
    )
}

export default Home;