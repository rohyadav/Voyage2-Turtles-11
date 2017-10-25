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
//creating the redux store for entire application
let store = createStore(notesApp, window.STATE_FROM_SERVER);
// every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener

let unsubscribe = store.subscribe(() =>
  console.log(store.getState()),
)

export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      note: '',
      searchButton: '../assets/search_transparent.png',
    }
  }

  // HANDLES SEARCH
  setSearchQuery = (event) => {
    this.setState({ searchTerm: event.target.value });
  }
  handleNoteSearch = () => {
    if (this.state.searchTerm === '') {
      return null;
    } else {
      store.dispatch(searchNotes(this.state.searchTerm));
      (this.state.searchButton === '../assets/search_transparent.png') ? this.setState({ searchButton: '../assets/search – 2.png' }) : this.setState({ searchButton: "../assets/search_transparent.png'" });
    }

  }
  // HANDLES ADDING NEW NOTES
  setNote = (event) => {
    this.setState({ note: event.target.value });
  }
  handleNoteSubmit = () => {
    store.dispatch(addNotes(this.state.note));
    document.getElementById("notesQty").innerText = Number.parseInt(document.getElementById("notesQty").innerText) + 1;
    console.log("inside Notes.js, the notes qty is " + this.state.notesQuantity)
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
            <div>
              <a><img className='notesButton' onClick={this.handleNoteSearch} src={this.state.searchButton}></img></a>
              <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search" />
            </div>
            <br />
            <NotesVisibleSearch />

            {/* NEW NOTE */}
            <div>
              <button className='addNotesButton' onClick={this.handleNoteSubmit} notesquantity={this.state.notesQuantity}>+</button>
              <textarea className='Notes' onChange={this.setNote} required placeholder='New Note' />
            </div>

            {/* NOTES LISTED OUT*/}
            <span className="filterBox">
              <NotesFilterLink filter="SHOW_ACTIVE">Active</NotesFilterLink>
              {'  |  '}
              <NotesFilterLink filter="SHOW_PINNED">Pinned</NotesFilterLink>
              {'  |  '}
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
    console.log("render");
    return (
      <div></div>
    )
  }
}

