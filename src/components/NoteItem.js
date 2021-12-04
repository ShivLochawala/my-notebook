import React, { useContext, useState, useRef } from 'react'
import NoteContext from '../contexts/notes/NoteContext';

export default function NoteItem(props) {
    const { _id, title, description, tag} = props.note;
    const context = useContext(NoteContext);
    const { deleteNote, editNote } = context;
    const [note, setNote] = useState({title:title, description:description, tag:tag});
    const ref = useRef(null);

    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    const handleEdit = (e) => {
        e.preventDefault();
        ref.current.click();
        editNote(_id, note.title, note.description, note.tag);
    }
    
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <i className="far fa-edit mx-2" data-bs-toggle="modal" data-bs-target={`#exampleModal-${_id}`} ></i>
                        <i className="far fa-trash-alt mx-2" onClick={() => { if (window.confirm('Are you sure you want to delete this note?')) { deleteNote(_id) }; }}></i>
                    </div>
                </div>
            </div>

            <div className="modal" ref={ref} id={`exampleModal-${_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-secondary text-light">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="noteTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} placeholder="Note Title" minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteDescription" className="form-label">Description</label>
                                    <textarea className="form-control" onChange={onChange} name="description" placeholder="Note Description" value={note.description}  minLength={5} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noteTag" className="form-label">Tag [Note Related to] <small>Optional</small></label>
                                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" onChange={onChange} placeholder="Ex: Personal" value={note.tag} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.title.length<5||note.description.length<5} type="button" className="btn btn-dark" onClick={handleEdit}>Update Changes</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
