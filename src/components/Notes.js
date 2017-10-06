import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Notes.css';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      visibility: true,
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
            searchTerm={this.state.searchTerm} input={this.state.arrayOfNotes}/>

          {/* NEW NOTE */}
          <button className='addNotesButton' onClick={this.handleSubmit}>X</button>
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
      searchTerm: this.props.searchTerm,
      array: this.props.input
    }
    
  }
  render() {
    if (this.state.searchTerm.length === 0) {
      return (
        <h5>Please use a longer search term</h5>
      )
    } else {
        return (
          <div>
    
          </div>
        )
    }
    
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

