import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    //Read a Notes
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }
    const [notes, setNotes] = useState([]);

    //Add a Note
    const addNote = async (title, description, tag) => {
        //TODO: API Call
        if(tag === ''){
            tag = 'General';
        }
        await fetch(`${host}/api/notes/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        window.location.href = "/";
        // eslint-disable-next-line
    }
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //TODO: API Call
        await fetch(`${host}/api/notes/update-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // eslint-disable-next-line
    
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        //window.location.href = "/";
    }
    //Delete a Note
    const deleteNote = async (id) => {
        //TODO: API Call
        await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        // eslint-disable-next-line
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
