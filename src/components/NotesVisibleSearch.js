import { connect } from 'react-redux';
import { searchNotes } from '../actions/Notes_Actions';
import { NotesList } from './NotesBundlerSearch';

const getVisibleNotes = (notes, filter) => {
    switch (filter) {
        case "SEARCH_NOTES":
            return notes.filter(n => n.search)
        default:
            return notes;
    }
}

const mapStateToProps = state => {
    return {
        notes: getVisibleNotes(state.notes, state.NotesVisibilityFilters)
    }
}

// const mapDispatchToProps = dispatch => {
//     return dispatch();
// }

export const NotesVisibleSearch = connect(
    mapStateToProps,
    null
)(NotesList)

