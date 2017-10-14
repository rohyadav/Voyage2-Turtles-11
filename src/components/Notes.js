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
  pinNotes,
  NotesVisibilityFilters
} from '../actions/Notes_Actions';
//creating the redux store for entire application
let store = createStore(notesApp, window.STATE_FROM_SERVER);

// every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)


// stop listening to state updates
// unsubscribe();

/* NOTES FEATURE */
export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      note: '',
    }
  }
  setSearchQuery = (event) => {
    this.setState({searchTerm: event.target.value});
  }
  handleNoteSearch = () => {
    store.dispatch(searchNotes(this.state.searchTerm));
    // renders the search results
  }
  setNote = (event) => {
    this.setState({note: event.target.value});
  }
  handleNoteSubmit = () => {
    store.dispatch(addNotes(this.state.note));
  }

  render() {
    return (
      <div>
        {/* HEADER */}
        <div className='Notes-Header'>
          <button className='exitButton' onClick={this.props.closeHandler}>X</button>
          <h1 className='Notes-Title-Text'>Notes</h1>
        </div>
        <div className='Notes-Body'>
          {/* SEARCH FEATURE */}
          <textarea onChange={this.setSearchQuery} className='Notes SearchBox SearchBoxText' defaultValue="Search" />
          <button className='notesButton' onClick={this.handleSearchSubmit}>Search</button>
          {/* X out button for search, on click, it clears searchresult. */}

          {/* NEW NOTE */}
          <button className='addNotesButton' onClick={this.handleNoteSubmit}>+</button>
          <textarea className='Notes NoteTitleTextBox Title' onChange={this.setNote} defaultValue='New Note' />

          {/* NOTES LISTED OUT*/}
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

