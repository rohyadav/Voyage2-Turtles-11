import { connect } from 'react-redux';
import { toggleNotes } from '../actions/Notes_Actions';
import { pinNotes } from '../actions/Notes_Actions';
import { deleteNotes } from '../actions/Notes_Actions';
import { updateNotes } from '../actions/Notes_Actions';
import { NotesSearchList } from './NotesBundlerSearch';

const getVisibleSearchResults = (notes, filter) => {
    let results = notes.filter(n => n.search);
    if (results.length === 0) {
        return null;
    } else {
        return results;
    }
}

const mapStateToProps = state => {
    // console.log("Mapping state to props because state changed.");
    return {
        notes: getVisibleSearchResults(state.notes, state.notesVisibilityFilters)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPinClick: id => {
            dispatch(pinNotes(id))
            // console.log("pinNotes id is : " + id )
        },
        onArchiveClick: id => {
            dispatch(toggleNotes(id))
            // console.log("toggleNotes id is : " + id )
        },
        onDeleteNoteClick: id => {
            dispatch(deleteNotes(id))
            // console.log("deleteNotes id is : " + id )
        },
        onUpdateClick: (text, id) => {
            dispatch(updateNotes(text, id))
        }
    }
}

export const NotesVisibleSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesSearchList)

