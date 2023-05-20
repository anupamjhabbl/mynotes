import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // fetching notes
  const fetchNotes = async() => {
    const response = await fetch(`http://localhost:5000/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NTFmMDQzZWRkYjY3NWQ0NmZlZTQzIn0sImlhdCI6MTY4NDQxMDMyMX0.0_OTnf847pYUV8R8v3oDSAfHDz2yK2Wvyr7cbe2hBuI",
      }
    });

    const notesTemp = await response.json();
    setNotes(notesTemp.notes);
    
  }

  // Adding note
  const addNote = async (title, description, tag) => {
    // backend
    const response = await fetch(`http://localhost:5000/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NTFmMDQzZWRkYjY3NWQ0NmZlZTQzIn0sImlhdCI6MTY4NDQxMDMyMX0.0_OTnf847pYUV8R8v3oDSAfHDz2yK2Wvyr7cbe2hBuI",
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      }),
    });

    // frontend
    const obj = {
      "_id": "6466120dej4ff649c2dc470d76",
      "title": title,
      "description": description,
      "tag": tag,
    }
    setNotes(notes.concat(obj));

  }

  // Updating a note
  const editNote = async (id, title, description, tag) => {
    // backend updating
    const response = await fetch(`http://localhost:5000/api/notes/updateNote/64661217e4ff649c2dc470d9`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NTFmMDQzZWRkYjY3NWQ0NmZlZTQzIn0sImlhdCI6MTY4NDQxMDMyMX0.0_OTnf847pYUV8R8v3oDSAfHDz2yK2Wvyr7cbe2hBuI",
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      }),
    });
    // const result = response.json(); 

    // frontend updating
    const element = notes;
    console.log("ye bhi");
    for (let i = 0; i < element.length; i++) {
      if (element[i]._id === id) {
        element[i].title = title;
        element[i].description = description;
        element[i].tag = tag;
        console.log("ye bhi");
      }
    }
    setNotes(element);
    console.log(element);
  }

  // Deleting a note 
  const deleteNote = async (id) => {
    // backend
    const response = await fetch(`http://localhost:5000/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2NTFmMDQzZWRkYjY3NWQ0NmZlZTQzIn0sImlhdCI6MTY4NDQxMDMyMX0.0_OTnf847pYUV8R8v3oDSAfHDz2yK2Wvyr7cbe2hBuI",
      }
    });

    // frontend
    console.log("deleting a node " + id);
    let newNote = notes.filter((element) => {
      return element._id !== id;
    })
    console.log(newNote);
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNotes }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteState;