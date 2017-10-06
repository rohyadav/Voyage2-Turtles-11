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
  componentDidMount() {
    document.addEventListener('click', this.toggleVisibility);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.toggleVisibility);
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
    (this.state.visibility) ? this.setState({visibility: true}) : this.setState({visibility: false});
  }
  keepCount = () => {
    this.setState({quantity: this.state.quantity + 1})
  }
  render() {
    if (this.toggleVisibility) {
      return (
        <div>
          <header className='Notes-Header'><h1 className='Notes-Title-Text'>Notes</h1></header>

          {/* SEARCH FEATURE */}
          <textarea searchInput={this.state.searchInput} onChange={this.handleSearch} className='SearchBox'>
            <p className='SearchBoxText'>What are you looking for?</p>
          </textarea>
          <button onClick={this.handleSearchSubmit}>Search</button>
          <Search 
            searchTerm={this.state.searchTerm} input={this.state.arrayOfNotes}/>

          {/* NEW NOTE */}
          <input value={this.state.titleInput} onChange={this.handleTitleInput}></input>
          <textarea value={this.state.input} onChange={this.handleInput}></textarea>
          <button onClick={this.handleSubmit}>Submit</button>
  
          <h5>Quanity of Notes: {this.state.quantity}</h5>
          {/* EXISTING NOTE LISTED OUT*/}
          <RenderToHtml 
            input={this.state.arrayOfNotes}/>
  
        </div>
      )
      } else {
      return (
        <div>
        </div>
      )
    }
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
    this.state = {
      searchResults: [],
      searchTerm: this.props.searchTerm,
      array: this.props.input
    }
    
  }
  render() {
    if (this.state.searchTerm.length === 0) {
      return (
        <p>Please use a longer search term</p>
      )
    } else {
        return (
          <div>
    
          </div>
        )
    }
    
  };
}
export default Notes;
