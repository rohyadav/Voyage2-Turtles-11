import React, { Component } from 'react';
import './Notes.css';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      visibility: false,
      searchInput: '',
      searchTerm: '',
      titleInput: '',
      input: '',
      arrayOfNotes: [],
    }
  }
  handleSearch = (event) => {
    this.setState({searchInput: event.target.value});
  }
  handleSearchSubmit = () => {
    this.setState({searchTerm: this.state.searchInput})
  }
  handleInput = (event) => {
    this.setState({input: event.target.value});
  }
  handleTitleInput = (event) => {
    this.setState({titleInput: event.target.value})
  }
  handleSubmit = () => {
    this.keepCount();
    const title = this.state.titleInput;
    const value = this.state.input;
    const newArray = [...this.state.arrayOfNotes];
    newArray[newArray.length] = [title, value];
    this.setState({
      arrayOfNotes: newArray
    })
  }
  toggleVisibility = () => {
    (this.state.visibility) ? this.setState({visibility: false}) : this.setState({visibility: true});
  }
  keepCount = () => {
    this.setState({quantity: this.state.quantity + 1})
  }
  render() {
    return (
      <div>
        <header className='Notes-Header'><p>Notes</p></header>

        <textarea searchInput={this.state.searchInput} className='SearchBox'>
          <p className='SearchBoxText'>What are you looking for?</p>
        </textarea>
        <button onClick={this.toggleVisibility} onClick={this.handleSearchSubmit}>Search</button>
        <Search 
          searchTerm={this.state.searchTerm} input={this.state.arrayOfNotes}/>

        <input value={this.state.titleInput} onChange={this.handleTitleInput}></input>
        <textarea value={this.state.input} onChange={this.handleInput}></textarea>
        <button onClick={this.handleSubmit}>Submit</button>

        <h5>Quanity of Notes: {this.state.quantity}</h5>

        <RenderToHtml 
          input={this.state.arrayOfNotes}/>

      </div>
    )
  }
}

class RenderToHtml extends Component {
  constructor(props) {
    super(props)
    this.mappedElements = [];
  }
  
  render() {
    this.mappedElements = (this.props.input).map((item,i) =>
      <div id={'note_' + i} className='Notes'>
        <h5 className="Title">{item[0]}</h5>
        <p className="Description">{item[1]}</p>
      </div>
    );
    return (
      <div>
        <div> 
            <h3>Notes:</h3>
            <p>{this.mappedElements}</p>
        </div>
      </div>
    )
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchResults = [];
    const searchTerm = this.props.searchTerm;
    const array = this.props.input;
  }
  if (searchTerm.length === 0) {
    return 'Please use a longer search term';
  } else {
    array.forEach()
  }
  render() {
    return (
      <div>

      </div>
    )
  };
}
export default Notes;
