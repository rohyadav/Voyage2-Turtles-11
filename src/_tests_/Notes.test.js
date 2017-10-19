import notesApp from '../reducers/Notes_Reducers';
import { createStore } from 'redux';
import {
    addNotes,
    toggleNotes, 
    deleteNotes, 
    searchNotes,
    setNotesVisibilityFilter,
    closeNotesSearch,
    pinNotes,
    NotesVisibilityFilters
  } from '../actions/Notes_Actions';

import { connect } from 'react-redux';
import { NotesList } from '../components/NotesBundler';
import { NotesVisibleList } from '../components/NotesVisibileList';
let store = createStore(notesApp, window.STATE_FROM_SERVER);

describe('testing Redux Store', () => {
    test('add new note to initial store state', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: [{
                    id: 0,
                    text: "Francesca Sadikin",
                    completed: false,
                    search: false,
                    pinned: false
                }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(addNotes('Francesca Sadikin'));
        callback(store.getState());
    });
    
    test('add new note to store state with one existing note', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [
                        {
                            id: 0,
                            text: "Francesca Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        },
                        {
                            id: 1,
                            text: "Natasha Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        }
                    ],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(addNotes('Natasha Sadikin'));
        callback(store.getState());
    });
  
    test('toggle visibility of first note', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [
                        {
                            id: 0,
                            text: "Francesca Sadikin",
                            completed: true,
                            search: false,
                            pinned: false
                        },
                        {
                            id: 1,
                            text: "Natasha Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        }
                    ],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(toggleNotes(0));
        callback(store.getState());
    });

    test('toggle visibility of first note AGAIN', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [
                        {
                            id: 0,
                            text: "Francesca Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        },
                        {
                            id: 1,
                            text: "Natasha Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        }
                    ],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(toggleNotes(0));
        callback(store.getState());
    });

    test('toggle visibility filter to ARCHIVED', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [
                        {
                            id: 0,
                            text: "Francesca Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        },
                        {
                            id: 1,
                            text: "Natasha Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        }
                    ],
                notesVisibilityFilters: "SHOW_ARCHIVED"
            });
            done();
        }
        store.dispatch(setNotesVisibilityFilter(NotesVisibilityFilters.SHOW_ARCHIVED));
        callback(store.getState());
    });

    test('toggle visibility filter to ACTIVE', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [
                        {
                            id: 0,
                            text: "Francesca Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        },
                        {
                            id: 1,
                            text: "Natasha Sadikin",
                            completed: false,
                            search: false,
                            pinned: false
                        }
                    ],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(setNotesVisibilityFilter(NotesVisibilityFilters.SHOW_ACTIVE));
        callback(store.getState());
    });
    
    test('delete note 0', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(deleteNotes(0));
        callback(store.getState());
    });

    test('search for Sadikin keyword', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: true,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(searchNotes('Sadikin'));
        callback(store.getState());
    });

    test('clear search box', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(closeNotesSearch());
        callback(store.getState());
    });

    test('search should work with lowercase or uppercase search terms', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: true,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(searchNotes('SADIKIN'));
        callback(store.getState());
    });

    test('search for HELLO keyword should return false', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(closeNotesSearch());
        store.dispatch(searchNotes('Hello'));
        callback(store.getState());
    });

    test('setting the notesVisibilityFilter to SHOW_PINNED', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_PINNED"
            });
            done();
        }
        store.dispatch(setNotesVisibilityFilter(NotesVisibilityFilters.SHOW_PINNED));
        callback(store.getState());
    });

    test('pinning note 0 should set pin to true', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: true
                    }],
                notesVisibilityFilters: "SHOW_PINNED"
            });
            done();
        }
        store.dispatch(pinNotes(0));
        callback(store.getState());
    });

    test('pinning note 0 again set pin to false', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }],
                notesVisibilityFilters: "SHOW_PINNED"
            });
            done();
        }
        store.dispatch(pinNotes(0));
        callback(store.getState());
    });
  
    test('new note ID should not overlap with existing IDs', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }, 
                    {
                        id: 2,
                        text: "Francesca Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }
                ],
                notesVisibilityFilters: "SHOW_PINNED"
            });
            done();
        }
        store.dispatch(addNotes('Francesca Sadikin'));
        callback(store.getState());
    });
});

describe('Rendering a visible list in React', () => {
    test('notesVisibleList should render a list', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: 
                    [{
                        id: 1,
                        text: "Natasha Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }, 
                    {
                        id: 2,
                        text: "Francesca Sadikin",
                        completed: false,
                        search: false,
                        pinned: false
                    }
                ],
                notesVisibilityFilters: "SHOW_PINNED"
            });
            done();
        }
        store.dispatch(deleteNotes(0));
        store.dispatch(deleteNotes(1));
        store.dispatch(addNotes('Francesca Sadikin'));
        callback(<NotesVisibleList />);
    });
});