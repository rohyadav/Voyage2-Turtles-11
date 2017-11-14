import React from 'react';
import PropTypes from 'prop-types';

export const Note = ({ onDeleteClick, onArchiveClick, onPinClick, onUpdateClick, text, id, pinned, completed, newText }) => {
    // console.log("Note text is: " + text);
    let pinStyle;
    let archiveStyle;
    if (pinned) {
        pinStyle = { backgroundImage: "url('../assets/pin – 1.png')"}
    } else {
        pinStyle = { backgroundImage: "url('../assets/pin.png')" }
    }
    if (completed) {
        archiveStyle = { backgroundImage: "url('../assets/archive – 1.png')"}
    } else {
        archiveStyle = { backgroundImage: "url('../assets/archive.png')" }
    }
    return (
        <div id={id} name={"note_" + id}>
            <div>
                <button name="notesUpdateNotesButton" className="notesDoneUpdatingExisting" onClick={onUpdateClick}>Update</button>
                {/* this is the delete button */}
                {<button 
                    className='deleteNotesButton' 
                    onClick={onDeleteClick}>
                </button>}
                {/* this is the archive button */}
                {<button 
                    className='archiveNotesButton' 
                    style={archiveStyle} 
                    onClick={onArchiveClick}>
                </button>}
                {/* this is the pin button */}
                {<button 
                    className='pinNotesButton' 
                    style={pinStyle} 
                    onClick={onPinClick}>
                </button>}
            </div>
            <div type="text" contentEditable="true" className="existingNotes">
                {text}
            </div>
        </div>
    )
}

// Property Type check. Ensures that the input type is what its supposed to be
Note.propTypes = {
    text: PropTypes.string.isRequired
}

export const NotesSearchList = ({ notes, onPinClick, onArchiveClick, onDeleteNoteClick , onUpdateClick }) => {
    if (notes === null || notes.length === 0) {
        return (
            <div className="notesErrorMessage">No results found</div>
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
                        onUpdateClick={(event) => onUpdateClick(event.target.parentNode.parentNode.lastChild.innerText, singleNote.id) }
                        onArchiveClick={() => onArchiveClick(singleNote.id)}
                        onPinClick={() => onPinClick(singleNote.id)}
                    />
                ))}
            </div>
        )
    }
}

