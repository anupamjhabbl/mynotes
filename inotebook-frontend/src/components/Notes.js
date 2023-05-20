import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

const Notes = () => {
    const contextObj = useContext(NoteContext);
    useEffect(()=>{
        contextObj.fetchNotes();
    },[])
    return (
        <div className="your_notes my-5">
            <h1 className="my-3">Your Notes</h1>
            <div className="container">
                <div className="row">
                    {
                        contextObj.notes.map((element) => {
                            return <NoteItem key={element._id} id={element._id} title={element.title} description={element.description} tag={element.tag}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes;