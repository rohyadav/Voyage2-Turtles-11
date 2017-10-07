import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Notes.css';

export class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      searchTerm: '',
      noteTitle: '',
      noteDescription: '',
      arrayOfNotes: [],
    }
  }
  setSearchQuery = (event) => {
    this.setState({ searchInput: event.target.value });
  }
  setNoteDescription = (event) => {
    this.setState({ noteDescription: event.target.value });
  }
  setNoteTitle = (event) => {
    this.setState({ noteTitle: event.target.value });
  }
  handleNoteSubmit = () => {
    console.log(this.state.noteDescription);
    const title = this.state.noteTitle;
    const value = this.state.noteDescription;
    this.setState(prevState => ({ arrayOfNotes: prevState.arrayOfNotes.concat([{ 'title': title, 'description': value }]) }));
  }
  closeNotes = () => {
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
          <RenderNotesAsList
            input={this.state.arrayOfNotes} />
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
    this.mappedElements = (this.props.input).map((item, i) =>
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

