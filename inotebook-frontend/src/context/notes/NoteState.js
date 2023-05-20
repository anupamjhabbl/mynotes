import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {
    let notesTemp = [
          {
            "_id": "64661079a0b85babb53933e81",
            "userId": "64651f043eddb675d46fee43",
            "title": "my first note",
            "description": "It's a description of my note",
            "tag": "Personal",
            "date": "2023-05-18T11:48:09.560Z",
            "__v": 0
          },
          {
            "_id": "6466120de4ff649wc2dc470d72",
            "userId": "64651f043eddb675d46fee43",
            "title": "my first note2",
            "description": "It's a description of my note",
            "tag": "Personal",
            "date": "2023-05-18T11:54:53.307Z",
            "__v": 0
          },
          {
            "_id": "64661079a0b85babb5v3933e83",
            "userId": "64651f043eddb675d46fee43",
            "title": "my first note",
            "description": "It's a description of my note",
            "tag": "Personal",
            "date": "2023-05-18T11:48:09.560Z",
            "__v": 0
          },
          {
            "_id": "6466120de4ff6k49c2dc470d74",
            "userId": "64651f043eddb675d46fee43",
            "title": "my first note2",
            "description": "It's a description of my note",
            "tag": "Personal",
            "date": "2023-05-18T11:54:53.307Z",
            "__v": 0
          },
          {
            "_id": "64661079a70b85babb53933e85",
            "userId": "64651f043eddb675d46fee43",
            "title": "my first note",
            "description": "It's a description of my note",
            "tag": "Personal",
            "date": "2023-05-18T11:48:09.560Z",
            "__v": 0
          },
          {
            "_id": "6466120dej4ff649c2dc470d76",
            "userId": "64651f043eddb675d46fee43",
            "title": "my first note2",
            "description": "It's a description of my note",
            "tag": "Personal",
            "date": "2023-05-18T11:54:53.307Z",
            "__v": 0
          }
        ]

    const [notes, setNotes] = useState(notesTemp); 

    // Adding note
    const addNote = (title, description, tag) => {
        const obj = {
            "id": "6466120dej4ff649c2dc470d677",
            "title": title,
            "description": description,
            "tag": tag,
        }
        setNotes(notes.concat(obj));
        
    }

    // Updating a note
    const editNote = (id) => {

    }

    // Deleting a note 
    const deleteNote = (id) => {

    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, editNote, deleteNote}}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;