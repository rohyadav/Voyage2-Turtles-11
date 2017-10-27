import React from 'react';
import PropTypes from 'prop-types';

export const Note = ({ onDeleteClick, onArchiveClick, onPinClick, onUpdateClick, text }) => {
    console.log("Note text is: " + text);
    return (
        <div>
            <div  className="buttonBox">
                {/* this is the delete button */}
                {<button className='deleteNotesButton existingNotesButtonBox' onClick={onDeleteClick}></button>}
                {/* this is the archive button */}
                {<button className='archiveNotesButton existingNotesButtonBox' onClick={onArchiveClick}></button>}
                {/* this is the pin button */}
                {<button className='pinNotesButton existingNotesButtonBox' onClick={onPinClick}></button>}
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
    return (
        <div>
            {notes.map((singleNote, index) => (
                <Note id={index} key={index} {...singleNote} 
                onDeleteClick={() => onDeleteNoteClick(singleNote.id)} 
                onUpdateClick={() => onUpdateClick(singleNote.id)} 
                onArchiveClick={() => onArchiveClick(singleNote.id)} 
                onPinClick={() => onPinClick(singleNote.id)} 
            />
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

