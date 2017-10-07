import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visibility: true,
          input: '',
          arrayOfNotes: [],
        }
      }
      handleInput = (event) => {
        this.setState({input: event.target.value});
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
      toggleVisibility = () =>{
        this.setState(prevState => ({visibility : !prevState.visibility}));
        if (this.state.visibility === true) {
            return ReactDOM.render(<Bookmarks />, document.getElementById('bookmarks'));
        } else {
            return ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
        }
      }

      render() {
          return (
            <div>
              {/* HEADER */}
              <div className='Bookmarks-Header'>
                <button className='bookmarksExitButton' onClick={this.toggleVisibility}>X</button>
                <h1 className='Bookmarks-Title-Text'>Bookmarks</h1>
              </div>
              {/* SEARCH FEATURE */}
              <div className='Bookmarks-Body'>
              <textarea searchinput={this.state.input} onChange={this.handleInput} className='Bookmarks SearchBox SearchBoxText'>
                Search something!
              </textarea>
              <button className='bookmarksButton' onClick={this.handleSubmit}>Search</button>
              <Search 
                searchTerm={this.state.input} array={this.state.arrayOfNotes} />
                </div>
            </div>
        );
      }
}
class Search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchResults: [],
        searchTerm: this.props.searchTerm,
        array: this.props.array
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

export default Bookmarks;