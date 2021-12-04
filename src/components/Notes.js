import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import NoteContext from '../contexts/notes/NoteContext'
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";

export default function Notes () {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const {notes, getNotes} = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between">
                <h2 className="mb-3">Your Notes</h2>
                <div>
                <Link to="/add-note" className="btn btn-dark"><i className="fas fa-plus"></i> Add Note</Link>
                </div>
            </div>
            <div className="row">
                <div className="container my2">
                {notes.length===0&&'There is no notes'}
                </div>
                {notes.map((note, index) => {
                    return <NoteItem key={index} note={note} />
                })}
            </div>
        </div>
    )
}
