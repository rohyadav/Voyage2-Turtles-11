import React from 'react';
import PropTypes from 'prop-types';
import { pinNotes } from '../actions/Notes_Actions';
import { deleteNotes } from '../actions/Notes_Actions';
import { toggleNotes } from '../actions/Notes_Actions';
import notesApp from '../reducers/Notes_Reducers';
import { createStore } from 'redux';
let store = createStore(notesApp, window.STATE_FROM_SERVER);

export const Note = ({ onDeleteClick, onArchiveClick, onPinClick, text }) => (
    <div className="Notes">
        {/* this is the pin button */}
        <button className='pinNotesButton' onClick={onPinClick}>Pin</button>
        {/* this is the archive button */}
        <button className='archiveNotesButton' onClick={onArchiveClick}>A</button>
        {/* this is the delete button */}
        <button className='deleteNotesButton' onClick={onDeleteClick}>X</button>
        <textarea defaultValue={text}></textarea>
    </div>
)

// Property Type check. Ensures that the input type is what its supposed to be
Note.propTypes = {
    text: PropTypes.string.isRequired
}
 

export const NotesList = ({ notes, onPinClick, onArchiveClick, onDeleteClick }) => {
    if (notes.length === 0) {
        return (
            null
        )
    } else {
        var notesArray = [];
        for (var i = 0; i < notes.length; i++) {
            var key = notes[i].id;
                notesArray.push(<Note key={key} {...notes[i]}
                    onPinClick={() => onPinClick(key)} 
                    onArchiveClick={() => onArchiveClick(key)} 
                    onDeleteClick={() => onDeleteClick(key)} 
                />);
        }
        //console.log(notesArray);
        return (
            <div>
                {notesArray}
            </div>
        )
    }
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
    onArchiveClick: PropTypes.func.isRequired
}

