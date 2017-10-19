export const VisibilityFilter = (state = "SHOW_ACTIVE", action) => {
    switch (action.type) {
        case 'SET_NOTES_VISIBILITY_FILTER':
            return action.NotesVisibilityFilters
        default:
            return state
    }
}

