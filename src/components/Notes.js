import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Notes.css';

const notesArray = [];

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
      arrayOfNotes: notesArray,
    }
  }
  handleSearch = (event) => {
    this.setState({searchInput: event.target.value});
  }
  handleSearchSubmit = () => {
    this.setState({searchTerm: this.state.searchInput});
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
    notesArray.push(newArray);
  }
  toggleVisibility = () =>{
    this.setState(prevState => ({visibility : !prevState.visibility}));
    if (this.state.visibility === true) {
        return ReactDOM.render(<Notes />, document.getElementById('notes'));
    } else {
        return ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
    }
  }
  keepCount = () => {
    this.setState({quantity: this.state.quantity + 1})
  }
  render() {
      return (
        <div>
          {/* HEADER */}
          <div className='Notes-Header'>
            <button className='exitButton' onClick={this.toggleVisibility}>X</button>
            <h1 className='Notes-Title-Text'>Notes</h1>
          </div>
          {/* SEARCH FEATURE */}
          <div className='Notes-Body'>
          <textarea searchinput={this.state.searchInput} onChange={this.handleSearch} className='Notes SearchBox SearchBoxText'>
            Search something!
          </textarea>
          <button className='notesButton' onClick={this.handleSearchSubmit}>Search</button>
          <Search 
            searchTerm={this.state.searchTerm} array={this.state.arrayOfNotes}/>

          {/* NEW NOTE */}
          <button className='addNotesButton' onClick={this.handleSubmit}>+</button>
          <textarea className='Notes  NewNoteBoxTitle Title' 
                    value={this.state.titleInput} 
                    onChange={this.handleTitleInput}>
                    Title
                    </textarea>
          <textarea className='Notes  NewNoteBoxDescription Description' value={this.state.input} onChange={this.handleInput}>Description</textarea>
      
          <h5>Quanity of Notes: {this.state.quantity}</h5>
          
          {/* EXISTING NOTE LISTED OUT*/}
          <RenderNotesAsList 
            input={this.state.arrayOfNotes}/>
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
    this.mappedElements = (this.props.input).map((item,i) =>
      <div id={'note_' + i} key={'key_' + i} className='Notes'>
        <div className="Title">{item[0]}</div>
        <div className="Description">{item[1]}</div>
      </div>
    );
    return (
      <div>
        <div> 
            <h5>Notes:</h5>
            <div>{this.mappedElements}</div>
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
    }
    this.resultOfSearchArray = [];
  }
  render() {
    const array = Array.from(this.props.array);
    for (var i = 0; i < array.length; i++) {
      const found = array[i].indexOf(this.props.searchTerm) !== -1;
      if (found) {
        this.resultOfSearchArray.push(array[i]);
      }
    }
    const formattedSearch = this.resultOfSearchArray.map((item,i) =>
      <div id={'note_' + i} key={'key_' + i} className='Notes'>
        <div className="Title">{item[0]}</div>
        <div className="Description">{item[1]}</div>
      </div>
    );
    return (
    <div>
      <div>{formattedSearch}</div>
    </div>
    )
  };
}
class EmptyContainer extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div></div>
      )
  }
}
export default Notes;

