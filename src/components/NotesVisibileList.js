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
            return notes.filter(n => !n.completed)
        case "SHOW_ARCHIVED":
            return notes.filter(n => n.completed)
        case "PINNED_NOTES":
            return notes.filter(n => n.pinned)
        default:
            return notes
    }
}

const mapStateToProps = state => {
    return {
        notes: getVisibleNotes(state.notes, state.NotesVisibilityFilters)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteClick: id => {
            dispatch(deleteNotes(id))
        },
        onPinClick: id => {
            dispatch(pinNotes(id))
        },
        onArchiveClick: id => {
            dispatch(toggleNotes(id))
        }
    }
}

const NotesVisibleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesList)

export default NotesVisibleList

