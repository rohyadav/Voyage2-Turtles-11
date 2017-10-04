import React, { Component } from 'react';
import './Notes.css';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      visibility: false,
      titleInput: '',
      input: '',
      arrayOfNotes: [['title','description'], ['2', 'description2']]
    }
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
    (this.state.quantity === 0) ? this.setState({visibility: false}) : this.setState({visibility: true});
  }
  keepCount = () => {
    this.setState({quantity: this.state.quantity + 1})
  }
  render() {
    return (
      <div>
        <header className='Notes-Header'><p className='SearchBoxText'>Notes</p></header>
        <textarea className='SearchBox'>What are you looking for?</textarea>
        <button>Search</button>
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
    this.mappedElements = (this.props.input).map(item =>
      <div  className='Notes'>
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

export default Notes;
