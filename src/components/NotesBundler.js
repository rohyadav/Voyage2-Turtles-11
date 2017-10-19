import React from 'react';
import PropTypes from 'prop-types';
import { pinNotes } from '../actions/Notes_Actions';
import { deleteNotes } from '../actions/Notes_Actions';
import { toggleNotes } from '../actions/Notes_Actions';
import { updateNotes } from '../actions/Notes_Actions';
import notesApp from '../reducers/Notes_Reducers';
import { createStore } from 'redux';
let store = createStore(notesApp,
                        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                        );

export const Note = ({ onDeleteClick, onArchiveClick, onPinClick, onUpdateClick, text }) => {
    console.log("Note text is: " + text);
    return (
        <div>
            <div className="buttonBox">
                {/* this is the delete button */}
                <button className='deleteNotesButton existingNotesButtonBox' onClick={onDeleteClick}>X</button>
                {/* this is the archive button */}
                {/* <button className='archiveNotesButton existingNotesButtonBox' onClick={onArchiveClick}>A</button> */}
                {/* this is the pin button */}
                {/* <button className='pinNotesButton existingNotesButtonBox' onClick={onPinClick}>P</button> */}
            </div>
            <textarea type='text' className="existingNotes" value={text} onChange={onUpdateClick}/>
        </div>
    )
}

// Property Type check. Ensures that the input type is what its supposed to be
Note.propTypes = {
    text: PropTypes.string.isRequired
}


export const NotesList = ({ notes, onPinClick, onArchiveClick, onDeleteNoteClick , onUpdateClick}) => {
    console.log("Rebuild notes list because state changed.");
    for (const singleNote of notes)
    {
        console.log(singleNote.text);
    }
    return (
        <div>
            {notes.map((singleNote, index) => (
                <Note key={index} {...singleNote} 
                onDeleteClick={() => onDeleteNoteClick(singleNote.id)} 
                onUpdateClick={() => onUpdateClick(singleNote.id)} />
            ))}
        </div>
    )
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            search: PropTypes.bool.isRequired,
            pinned: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onArchiveClick: PropTypes.func.isRequired,
}

