import { useContext,  useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';



const Notes = () => {
    const contextObj = useContext(NoteContext);
    const [displayState, setDisplayState] = useState("d-none");
    const [enote, setEnote] = useState({"id":"", "title":"","description":"","tag":""});

    // useEffect(() => {
    //     // eslint-disable-next-line
    //     contextObj.fetchNotes();
    // })

    const editNoteHandle = (note) => {
        setEnote(note);
        setDisplayState("d-block");
    }

    const closeModal = () => {
        setDisplayState("d-none");
    }

    const onChangeMethod = (e) => {
        setEnote({...enote, [e.target.name]:e.target.value});
    }

    const saveChanges = () => {
        console.log(enote);
        console.log(enote.id);
        contextObj.editNote(enote.id, enote.title, enote.description, enote.tag);
        setDisplayState("d-none");
    }

    return (
        contextObj.success && 
        <div className="your_notes my-5">
            {/* <!-- Modal --> */}
            <div className={`modal ${displayState}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit your note</h5>
                        </div>
                        <div className="modal-body">
                            <div className="notes_form">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="note_title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="note_title" name="title"  value={enote.title} aria-describedby="emailHelp"  onChange={onChangeMethod} required />
                                        <div id="emailHelp" className="form-text">Your title must be unique from other title and more than 3 characters</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a comment here"  value={enote.description} id="note_description" name="description" style={{ "height": "200px" }} onChange={onChangeMethod}></textarea>
                                            <label htmlFor="note_description">Comments</label>
                                            <div id="emailHelp" className="form-text">Your description must be  more than 5 characters </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="note_tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="note_tag" value={enote.tag} name="tag" onChange={onChangeMethod} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className={`btn btn-primary ${enote.title.length<=3 || enote.description.length<=5 ? "disabled" : ""}`} onClick={saveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="my-3">Your Notes</h1>
            <div className={`${contextObj.notes.length===0 ? "" : "d-none"}`}>No Notes to display</div>
            <div className="container">
                <div className="row">
                    {
                        contextObj.notes.map((element) => {
                            return <NoteItem key={element._id} id={element._id} editNoteHandle={editNoteHandle} title={element.title} description={element.description} tag={element.tag} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes;