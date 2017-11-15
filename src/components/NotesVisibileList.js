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
}

const mapStateToProps = state => {
    return {
        notes: getVisibleNotes(state.notes, state.notesVisibilityFilters)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPinClick: id => {
            dispatch(pinNotes(id));
            //console.log("pinNotes id is : " + id )
        },
        onArchiveClick: id => {
            dispatch(toggleNotes(id));
            //console.log("toggleNotes id is : " + id )
        },
        onDeleteNoteClick: id => {
            dispatch(deleteNotes(id));
            document.getElementById("notesQty").innerText = document.getElementById("notesQty").innerText - 1;
            //console.log("deleteNotes id is : " + id )
        },
        onUpdateClick: (text, id) => {
            dispatch(updateNotes(text, id))
            //console.log("onUpdateClick value is : " + text + "; id is: " + id )
        }
    }
}

const NotesVisibleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesList)

export default NotesVisibleList

