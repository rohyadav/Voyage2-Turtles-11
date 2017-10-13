// redux - reducers for Notes
import { NotesVisibilityFilters } from '../actions/Notes_Actions';
import { combineReducers } from 'redux';
import {
    ADD_NOTES,
    TOGGLE_NOTES, 
    DELETE_NOTES, 
    SET_NOTES_VISIBILITY_FILTER
} from '../actions/Notes_Actions';

const { SHOW_ACTIVE } = NotesVisibilityFilters

function notes(state = [], action) {
    switch (action.type) {
        case ADD_NOTES:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_NOTES:
            return state.map((notes, index) => {
                if (index === action.index) {
                    return Object.assign({}, notes, {
                        completed: !notes.completed
                    })
                }
                return notes;
            })
        case DELETE_NOTES:
            return [
                ...state.slice(0, index)
                ...state.slice(index + 1)
            ];
        default:
            return state;
    }
}

function NotesVisibilityFilters(state = SHOW_ACTIVE, action) {
    switch (action.type) {
        case SET_NOTES_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

const notesApp = combineReducers({
    visibilityFilter,
    notes
})

export default notesApp
// the above notesApp is really this but with a handy combineReducers utility
// export default function notesApp(state = {}}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         notes: notes(state.notes, action)
//     }
// }

