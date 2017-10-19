// redux - reducers for Notes
import {
    ADD_NOTES,
    TOGGLE_NOTES, 
    DELETE_NOTES, 
    PIN_NOTES,
    SEARCH_NOTES,
    CLOSE_NOTES_SEARCH,
    UPDATE_NOTES,
    SET_NOTES_VISIBILITY_FILTER,
    NotesVisibilityFilters
} from '../actions/Notes_Actions';

const { SHOW_ACTIVE } = NotesVisibilityFilters
var globalCounter = 0;
// adding the string.includes() method to search for strings
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

function notes(state = [], action) {
    console.log("Executing Notes Function")
    switch (action.type) {
        case ADD_NOTES:
            return [
                ...state,
                {
                    id: globalCounter++,
                    text: action.text,
                    completed: false,
                    search: false,
                    pinned: false
                }
            ]
        case UPDATE_NOTES:
            return state.map((notes, index) => {
                if (index === action.index) {
                    return Object.assign({}, notes, {
                        text: action.text
                    })
                }
                return notes;
            })
        case TOGGLE_NOTES:
            return state.map((notes, index) => {
                if (index === action.index) {
                    return Object.assign({}, notes, {
                        completed: !notes.completed
                    })
                }
                return notes;
            })
        case PIN_NOTES:
            return state.map((notes, index) => {
                if (index === action.index) {
                    return Object.assign({}, notes, {
                        pinned: !notes.pinned
                    })
                }
                return notes;
            })
        case DELETE_NOTES:
            return state.filter((singleNote) => {
                return singleNote.id !== action.index
            })
        case SEARCH_NOTES:
            return state.map((notes) => {
                var lowerCaseSearch = (action.text).toLowerCase();
                var lowerCaseNotes = (notes.text).toLowerCase();
                if (lowerCaseNotes.includes(lowerCaseSearch) === true) {
                    return Object.assign({}, notes, {
                        search: !notes.search
                    });
                } else {
                    return Object.assign({}, notes, {
                        search: notes.search
                    });
                }
            });
            
        case CLOSE_NOTES_SEARCH:
            return state.map((notes) => {
                return Object.assign({}, notes, {
                    search: false
                });
            })
        default:
            return state;
    }
}

export function notesVisibilityFilters(state = SHOW_ACTIVE, action) {
    console.log("Executing notesVisibilityFilters Function")
    switch (action.type) {
        case SET_NOTES_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

export default function notesApp(state = {}, action) {
    return {
        notesVisibilityFilters: notesVisibilityFilters(state.notesVisibilityFilters, action),
        notes: notes(state.notes, action)
    }
}


