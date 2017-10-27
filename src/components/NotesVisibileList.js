import { connect } from 'react-redux';
import { toggleNotes } from '../actions/Notes_Actions';
import { pinNotes } from '../actions/Notes_Actions';
import { deleteNotes } from '../actions/Notes_Actions';
import { updateNotes } from '../actions/Notes_Actions';
import { NotesList } from './NotesBundler';

const getVisibleNotes = (notes, filter) => {
    switch (filter) {
        case "SHOW_PINNED":
        return notes.filter(n => n.pinned);
        case "SHOW_ACTIVE":
            return notes.filter(n => !n.completed);
        case "SHOW_ARCHIVED":
            return notes.filter(n => n.completed);
        default:
            return notes;
    }
    // return notes;
}

const mapStateToProps = state => {
    console.log("Mapping state to props because state changed.");
    return {
        notes: getVisibleNotes(state.notes, state.notesVisibilityFilters)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPinClick: id => {
            dispatch(pinNotes(id));
            console.log("grabbing data by id and class " + 
                document.getElementById(id).querySelectorAll(".pinNotesButton")[0]
            );
            if ( document.getElementById(id).querySelectorAll(".pinNotesButton")[0].style.getPropertyValue("background-image") === 'url("../assets/pin_transparent.png")' ) {
                document.getElementById(id).querySelectorAll(".pinNotesButton")[0].style.backgroundImage = "url('../assets/pin – 1.png')";
            } else {
                document.getElementById(id).querySelectorAll(".pinNotesButton")[0].style.backgroundImage = "url('../assets/pin_transparent.png')";
            }
            console.log("pinNotes id is : " + id )
            //console.log(document.getElementById("notes_0").querySelectorAll(".pinNotesButton")[0].style.getPropertyValue("background-image") === 'url("../assets/pin_transparent.png")');
        },
        onArchiveClick: id => {
            dispatch(toggleNotes(id)),
            console.log("toggleNotes id is : " + id )
        },
        onDeleteNoteClick: id => {
            dispatch(deleteNotes(id));
            document.getElementById("notesQty").innerText = document.getElementById("notesQty").innerText - 1;
            console.log("deleteNotes id is : " + id )
        },
        onUpdateClick: (id, text) => {
            dispatch(updateNotes(text, id))
        }
    }
}

const NotesVisibleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesList)

export default NotesVisibleList

