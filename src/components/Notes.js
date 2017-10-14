import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Notes.css';
import PropTypes from 'prop-types'; // ES6
import { createStore } from 'redux';
import notesApp from '../reducers/Notes_Reducers';
import { connect } from 'react-redux';
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

const getVisibleNotes = (notes, filter) => {
  switch (filter) {
    case "SHOW_ACTIVE":
      return notes.filter(n => n.completed)
    case "SHOW_ARCHIVED":
      return notes.filter(n => !n.completed)
    case "SEARCH_NOTES":
      return notes.filter(n => n.search)
    case "PINNED_NOTES":
      return notes.filter(n => n.pinned)
  }
}

const mapStateToProps = state => {
  return {
    notes: getVisibleNotes(state.notes, state.NotesVisibilityFilters)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNotesClick: id => {
      dispatch(toggleNotes(id))
    }
  }
}

const VisibleNotesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesList)
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
    // render the search results
  }

  // clear search history method

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
          {/* <FilterLink filter="SHOW_ACTIVE">
            ACTIVE
          </FilterLink>
          {'  |  '}
          <FilterLink filter="SHOW_ARCHIVED">
            ARCHIVED
          </FilterLink> */}
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

