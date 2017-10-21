// redux action types for Notes Tab

export const NotesVisibilityFilters = {
    SHOW_ACTIVE: 'SHOW_ACTIVE',
    SHOW_ARCHIVED: 'SHOW_ARCHIVED',
    SHOW_PINNED: 'SHOW_PINNED',
    SHOW_SEARCH: 'SHOW_SEARCH'
}

export const ADD_NOTES = 'ADD_NOTES'
export const TOGGLE_NOTES = 'TOGGLE_NOTES'
export const DELETE_NOTES = 'DELETE_NOTES'
export const SEARCH_NOTES = 'SEARCH_NOTES'
export const PIN_NOTES = 'PIN_NOTES'
export const UPDATE_NOTES = 'UPDATE_NOTES'
export const CLOSE_NOTES_SEARCH = 'CLOSE_NOTES_SEARCH'
export const SET_NOTES_VISIBILITY_FILTER = 'SET_NOTES_VISIBILITY_FILTER'

export function addNotes(text) {
    return { type: ADD_NOTES, text }
}

export function toggleNotes(index) {
    return { type: TOGGLE_NOTES, index }
}

export function deleteNotes(index) {
    return { type: DELETE_NOTES, index }
}

export function searchNotes(text) {
    return { type: SEARCH_NOTES, text }
}

export function closeNotesSearch() {
    return { type: CLOSE_NOTES_SEARCH }
}

export function pinNotes(index) {
    return { type: PIN_NOTES, index }
}

export function updateNotes(text, index) {
    return { type: UPDATE_NOTES, index }
}

export function setNotesVisibilityFilter(filter) {
    return { type: SET_NOTES_VISIBILITY_FILTER, filter }
}