import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';

export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      input: '',
      arrayOfNotes: [],
    }
  }
  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }
  handleSubmit = () => {
    this.keepCount();
    const value = this.state.input;
    const newArray = [...this.state.arrayOfNotes];
    newArray[newArray.length] = value;
    this.setState({
      arrayOfNotes: newArray
    })
  }

  render() {
    return (
      <div>
        {/* HEADER */}
        <div className='Bookmarks-Header'>
          <button className='bookmarksExitButton' onClick={this.props.closeHandler}>X</button>
          <h1 className='Bookmarks-Title-Text'>Bookmarks</h1>
        </div>
        {/* SEARCH FEATURE */}
        <div className='Bookmarks-Body'>
          <div class="searchBookmarksBackground">
            <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" />
            <a><img alt="search" className='searchButton' onChange={this.handleNoteSearch} src={this.state.searchButton}></img></a>
          </div>
        </div>
      </div>
    );
  }
}
