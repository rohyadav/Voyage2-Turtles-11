import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ text }) => (
    <div>
        <textarea className='Notes'>{text}</textarea>
    </div>
)

// Property Type check. Ensures that the input type is what its supposed to be
Note.propTypes = {
    text: PropTypes.string.isRequired
}

export const NotesList = ({ notes }) => {
    if (notes.length === 0) {
        return (
            null
        )
    } else {
        var notesArray = [];
        for (var i = 0; i < notes.length; i++) {
                notesArray.push(<Note key={notes[i].id} {...notes[i]}/>);
        }
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
    onNoteClick: PropTypes.func.isRequired
}

