import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ onDeleteClick, onArchiveClick, onPinClick, onUpdateClick, text }) => (
    <div>
        <div className="buttonBox">
            {/* this is the delete button */}
            {<button className='deleteNotesButton existingNotesButtonBox' onClick={onDeleteClick}></button>}
            {/* this is the archive button */}
            {<button className='archiveNotesButton existingNotesButtonBox' onClick={onArchiveClick}></button>}
            {/* this is the pin button */}
            {<button className='pinNotesButton existingNotesButtonBox' onClick={onPinClick}></button>}
        </div>
        <textarea type='text' className="existingNotes" value={text} onChange={onUpdateClick} />
    </div>
)

// Property Type check. Ensures that the input type is what its supposed to be
Note.propTypes = {
    text: PropTypes.string.isRequired
}

export const NotesSearchList = ({ notes, onPinClick, onArchiveClick, onDeleteNoteClick , onUpdateClick }) => {
    if (notes === null || notes.length === 0) {
        return (
            null
        )
    } else {
        var notesArray = [];
        for (var i = 0; i < notes.length; i++) {
            notesArray.push(<Note key={notes[i].id} {...notes[i]} />);
        }
        return (
            <div>
                {notes.map((singleNote, index) => (
                    <Note key={index} {...singleNote}
                        onDeleteClick={() => onDeleteNoteClick(singleNote.id)}
                        onUpdateClick={() => onUpdateClick(singleNote.id)}
                        onArchiveClick={() => onArchiveClick(singleNote.id)}
                        onPinClick={() => onPinClick(singleNote.id)}
                    />
                ))}
            </div>
        )
    }
}

