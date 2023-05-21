import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // setAlertMethod
  const setAlertMethod = (message) => {
    if (setAlertKey !== null){
      clearTimeout(alertKey);
    }
    setMessage(message);
    setAlert(true);
    const k = setTimeout(()=>{
      setAlert(false);
    },2000);
    setAlertKey(k);
  }

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
    await fetch(`http://localhost:5000/api/notes/addNote`, {
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
    setAlertMethod("Successfully added note");
  }

  // Updating a note
  const editNote = async (id, title, description, tag) => {
    // backend updating
    await fetch(`http://localhost:5000/api/notes/updateNote/${id}`, {
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
    const element = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < element.length; i++) {
      if (element[i]._id === id) {
        element[i].title = title;
        element[i].description = description;
        element[i].tag = tag;
        break;
      }
    }
    setNotes(element);
    setAlertMethod("successfully edited the note");
  }

  // Deleting a note 
  const deleteNote = async (id) => {
    // backend
    await fetch(`http://localhost:5000/api/notes/deleteNote/${id}`, {
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
    setAlertMethod("Successfully deleted the note");
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNotes, alert, setAlertMethod, message, success, setSuccess  }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteState;