import React from 'react';
import PropTypes from 'prop-types';

export const Note = ({ onDeleteClick, onArchiveClick, onPinClick, text }) => (
    <div className="Notes">
        {/* this is the pin button */}
        <button className='pinNotesButton' onClick={onPinClick}>Pin</button>
        {/* this is the archive button */}
        <button className='archiveNotesButton' onClick={onArchiveClick}>Archive</button>
        {/* this is the delete button */}
        <button className='deleteNotesButton' onClick={onDeleteClick}>X</button>
        <textarea>
            {text}
        </textarea>
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
                notesArray.push(<Note key={notes[i].id} {...notes[i]}
                    onPinClick={() => onPinClick(notes[i].id)} 
                    onArchiveClick={() => onArchiveClick(notes[i].id)} 
                    onDeleteClick={() => onDeleteClick(notes[i].id)} 
                />);
        }

        return (
            <div>
                {notesArray}
            </div>
        )
    }
}


// return (
//     <div>
//         for (var i = 0; i < notes.length; i ++) {

//         }
//         {notes.map(note => {
//             <Note key={note.id} {...note} 
//                 onPinClick={() => onPinClick(note.id)} 
//                 onArchiveClick={() => onArchiveClick(note.id)} 
//                 onDeleteClick={() => onDeleteClick(note.id)} 
//             />
//         })}
//     </div>
// )

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

