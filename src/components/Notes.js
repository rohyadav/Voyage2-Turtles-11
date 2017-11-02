import React, { Component } from 'react';
import '../styles/Notes.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import notesApp from '../reducers/Notes_Reducers';
import { NotesFilterLink } from './NotesFilterLink';
import NotesVisibleList from './NotesVisibileList';
import { NotesVisibleSearch } from './NotesVisibleSearch';
import {
  addNotes,
  searchNotes,
} from '../actions/Notes_Actions';
import throttle from 'lodash/throttle';

//creating the redux store for entire application

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    } 
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {

  }
}
export const persistedState = loadState();
export let store = createStore(notesApp, persistedState);
// every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener

export let subscribe = store.subscribe(throttle(() => {
  saveState({
    notes: store.getState().notes
  });
}, 1000));


export const NotesQty = () => {
  return (
    store.getState().notes.length
  )
}
export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      note: '',
      searchButton: '../assets/search.png',
    }
  }

  // HANDLES SEARCH
  setSearchQuery = (event) => {
    this.setState({ searchTerm: event.target.value });
  }
  handleNoteSearch = () => {
    if (this.state.searchTerm === '') {
      return null;
    } else if (this.setState({ searchButton: '../assets/search – 2.png' })) {
      this.setState({ searchButton: "../assets/search.png" });
      store.dispatch(searchNotes());
    } else {
      store.dispatch(searchNotes(this.state.searchTerm));
      (this.state.searchButton === '../assets/search.png') ? this.setState({ searchButton: '../assets/search – 2.png' }) : this.setState({ searchButton: "../assets/search.png" });
    }
  }
  // HANDLES ADDING NEW NOTES
  setNote = (event) => {
    this.setState({ note: event.target.value });
  }
  handleNoteSubmit = () => {
    store.dispatch(addNotes(this.state.note));
    // updates the notes qty button on main Notes icon
    document.getElementById("notesQty").innerText = store.getState().notes.length;
    this.setState({note: ''});
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          {/* HEADER */}
          <header className='Notes-Header'>
            <button className='notesExitButton' onClick={this.props.closeHandler}>X</button>
            <h1 className='Notes-Title-Text'>Notes</h1>
          </header>
          <div className='Notes-Body'>
            {/* SEARCH FEATURE */}
            <div class="searchBackground">
              <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" />
              <a><img alt="searchIcon" className='searchButton' onChange={this.handleNoteSearch} src={this.state.searchButton}></img></a>
              <NotesVisibleSearch />
            </div>
            <br />
            

            {/* NEW NOTE */}
            <div>
              <button className='addNotesButton' onClick={this.handleNoteSubmit} notesquantity={this.state.notesQuantity}>+</button>
              <textarea className='Notes' onChange={this.setNote} required placeholder='New Note' />
            </div>

            {/* NOTES LISTED OUT*/}
            <span className="filterBox">
              <NotesFilterLink filter="SHOW_ACTIVE">Active</NotesFilterLink>
              <NotesFilterLink filter="SHOW_PINNED">Pinned</NotesFilterLink>
              <NotesFilterLink filter="SHOW_ARCHIVED">Archived</NotesFilterLink>
            </span>
            <section>
              <NotesVisibleList />
            </section>
          </div>
        </div>
      </Provider>
    )
  }
}



export class EmptyContainer extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}

