import { connect } from 'react-redux';
//import { setNotesVisibilityFilter } from '../actions/Notes_Actions';
import { toggleNotes } from '../actions/Notes_Actions';
import { pinNotes } from '../actions/Notes_Actions';
import { deleteNotes } from '../actions/Notes_Actions';
import { NotesList } from './NotesBundler';
import { Note } from './NotesBundler';

const getVisibleNotes = (notes, filter) => {
    switch (filter) {
        case "SHOW_ACTIVE":
            return notes.filter(n => !n.completed);
        case "SHOW_ARCHIVED":
            return notes.filter(n => n.completed);
        case "PINNED_NOTES":
            return notes.filter(n => n.pinned);
        default:
            return notes.filter(n => !n.completed);
    }
}

const mapStateToProps = state => {
    return {
        notes: getVisibleNotes(state.notes, state.NotesVisibilityFilters)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPinClick: id => {
            dispatch(pinNotes(id))
            console.log("pinNotes id is : " + id )
        },
        onArchiveClick: id => {
            dispatch(toggleNotes(id))
            console.log("toggleNotes id is : " + id )
        },
        onDeleteClick: id => {
            dispatch(deleteNotes(id))
            console.log("deleteNotes id is : " + id )
        }
    }
}

const NotesVisibleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesList)

export default NotesVisibleList

