import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Notes.css';
import PropTypes from 'prop-types'; // ES6
import { createStore } from 'redux';
import notesApp from '../reducers/Notes_Reducers';
import {
  addNotes,
  toggleNotes, 
  deleteNotes, 
  searchNotes,
  setNotesVisibilityFilter,
  closeNotesSearch,
  NotesVisibilityFilters
} from '../actions/Notes_Actions';
//creating the redux store for entire application
let store = createStore(notesApp, window.STATE_FROM_SERVER);

// every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// dispatch some actions
store.dispatch(addNotes('Francesca Sadikin'));
store.dispatch(addNotes('Natasha Sadikin'));
store.dispatch(addNotes('Yenny Sadikin'));
store.dispatch(addNotes('Xin Liu'));
store.dispatch(toggleNotes(0));
store.dispatch(toggleNotes(1));
store.dispatch(setNotesVisibilityFilter(NotesVisibilityFilters.SHOW_ACTIVE));
store.dispatch(deleteNotes(3));
store.dispatch(addNotes('Xin Liu number 2'));
store.dispatch(searchNotes("Xin"));

// stop listening to state updates
unsubscribe();

/* NOTES FEATURE */
export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      searchTerm: '',
    }
  }
  setSearchQuery = (event) => {
    this.setState({ searchInput: event.target.value });
  }
  setNote = (event) => {
    store.dispatch(addNotes(event.target.value));
  }
 
  handleNoteSubmit = () => {
    console.log(this.state.noteDescription);
    const title = this.state.noteTitle;
    const value = this.state.noteDescription;
    var prevState = localStorage.getItem('arrayOfNotes');
    if (prevState === null) {
      prevState = [];
    } else {
      prevState = JSON.parse(prevState);
      console.log("prevState is :" +  prevState);
    }
    var newState = prevState.concat(  [{ 'title': title, 'description': value }]  );
    localStorage.setItem('arrayOfNotes', JSON.stringify(newState) ) ;
  }
  render() {
    return (
      <div>
        {/* HEADER */}
        <div className='Notes-Header'>
          <button className='exitButton' onClick={this.props.closeHandler}>X</button>
          <h1 className='Notes-Title-Text'>Notes</h1>
        </div>
        {/* SEARCH FEATURE */}
        <div className='Notes-Body'>
          <textarea onChange={this.setSearchQuery} className='Notes SearchBox SearchBoxText' defaultValue="Search" />
          <button className='notesButton' onClick={this.handleSearchSubmit}>Search</button>
          <Search
            searchTerm={this.state.searchTerm} notes={this.state.arrayOfNotes} />

          {/* NEW NOTE */}
          <button className='addNotesButton' onClick={this.handleNoteSubmit}>+</button>
          <textarea className='Notes NoteTitleTextBox Title' onChange={this.setNoteTitle} defaultValue='Title' />
          <textarea className='Notes NoteDescriptionTextBox Description' defaultValue='Description' onChange={this.setNoteDescription} />
          <h5>Quantity of Notes: {this.state.quantity}</h5>

          {/* EXISTING NOTE LISTED OUT*/}
          {<RenderNotesAsList />}
        </div>
      </div>
    )
  }
}

class RenderNotesAsList extends Component {
  constructor(props) {
    super(props)
    this.mappedElements = [];
  }

  render() {
    var array = localStorage.getItem('arrayOfNotes');
    console.log("local storage array is an array: " + Array.isArray(array));
    if (array === null) {
      var parsedArray = [];
    } else {
      parsedArray = JSON.parse(array);
      console.log("parsedArray is an array: " + Array.isArray(parsedArray));
    }
    this.mappedElements = parsedArray.map((item, i) =>
      <div id={'note_' + i} key={'key_' + i} className='Notes'>
        <div className="Title">{item.title}</div>
        <div className="Description">{item.description}</div>
      </div>
    );
    return (
      <div>
        <h5>Notes:</h5>
        <div>{this.mappedElements}</div>
      </div>
    )
  }
}

RenderNotesAsList.propTypes = {
  array: PropTypes.array,
  mappedElements: PropTypes.array
};

class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const notes = this.props.notes;
    const searchTerm = this.props.searchTerm;
    var formattedSearch = [];
    if (searchTerm.length) {
      var searchResults = [];
      for (var i = 0; i < notes.length; i++) {
        const found = (notes[i].title.indexOf(searchTerm) !== -1) || (notes[i].description.indexOf(searchTerm) !== -1);
        if (found) {
          searchResults.push(notes[i]);
        }
      }
      formattedSearch = searchResults.map((item, i) =>
        <div id={'note_' + i} key={'key_' + i} className='Notes'>
          <div className="Title">{item.title}</div>
          <div className="Description">{item.description}</div>
        </div>
      );
    }

    return (
      <div>{formattedSearch}</div>
    )
  };
}

export class EmptyContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("render");
    return (
      <div></div>
    )
  }
}

