import { connect } from 'react-redux';
import { setNotesVisibilityFilter } from '../actions/Notes_Actions';
import {Link} from './NotesLink'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.notesVisibilityFilters
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setNotesVisibilityFilter(ownProps.filter))
        }
    }
}

export const NotesFilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)
