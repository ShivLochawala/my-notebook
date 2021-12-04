import React,{useContext, useState} from 'react';
import NoteContext from '../contexts/notes/NoteContext';
import { useNavigate } from "react-router-dom";

export default function AddNote() {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""});
    const history = useNavigate();

    const handleAdd = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        history('/');
    }   
    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div className="container mt-3">
            <div>
                <h2 className="text mb-3">Add Note</h2>
            </div>
            <form>
                <div className="mb-3">
                    <label htmlFor="noteTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} placeholder="Note Title"  minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="noteDescription" className="form-label">Description</label>
                    <textarea className="form-control" onChange={onChange}  minLength={5} required name="description" placeholder="Note Description"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="noteTag" className="form-label">Tag [Note Related to] <small>Optional</small></label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange} placeholder="Ex: Personal" />
                </div>
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-dark" onClick={handleAdd}><i className="fas fa-plus"></i> Add</button>
            </form>
        </div>
    )
}
