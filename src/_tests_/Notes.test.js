import notesApp from '../reducers/Notes_Reducers';
import { createStore } from 'redux';
import {
    addNotes,
    toggleNotes, 
    deleteNotes, 
    setNotesVisibilityFilter,
    NotesVisibilityFilters
  } from '../actions/Notes_Actions';
let store = createStore(notesApp, window.STATE_FROM_SERVER);

describe('testing Redux Store', () => {
    test('add new note to initial store state', done => {
        function callback(data) {
            expect(data).toEqual({
                notes: [{
                    text: "Francesca Sadikin",
                    completed: false
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
                            text: "Francesca Sadikin",
                            completed: false
                        },
                        {
                            text: "Natasha Sadikin",
                            completed: false
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
                            text: "Francesca Sadikin",
                            completed: true
                        },
                        {
                            text: "Natasha Sadikin",
                            completed: false
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
                            text: "Francesca Sadikin",
                            completed: true
                        },
                        {
                            text: "Natasha Sadikin",
                            completed: false
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
                            text: "Francesca Sadikin",
                            completed: true
                        },
                        {
                            text: "Natasha Sadikin",
                            completed: false
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
                        text: "Natasha Sadikin",
                        completed: false
                    }],
                notesVisibilityFilters: "SHOW_ACTIVE"
            });
            done();
        }
        store.dispatch(deleteNotes(0));
        callback(store.getState());
    });
});
