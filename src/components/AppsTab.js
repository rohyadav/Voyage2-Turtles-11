import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/AppsTab.css';

class AppsTab extends Component {
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

            // <div>
            //   {/* HEADER */}
            //   <div className='Bookmarks-Header'>
            //     <button className='bookmarksExitButton' onClick={this.props.closeHandler}>X</button>
            //     <h1 className='Bookmarks-Title-Text'>Bookmarks</h1>
            //   </div>
            //   {/* SEARCH FEATURE */}
            //   <div className='Bookmarks-Body'>
            //   <textarea searchinput={this.state.input} onChange={this.handleInput} className='Bookmarks SearchBox SearchBoxText'>
            //     Search something!
            //   </textarea>
            //   <button className='bookmarksButton' onClick={this.handleSubmit}>Search</button>
            //   <Search 
            //     searchTerm={this.state.input} array={this.state.arrayOfNotes} />
            //     </div>
            // </div>

      render() {
          return (
            <div>
              {/* HEADER */}
              <div className='Apps-Header'>
                <button className='AppsExitButton' onClick={this.props.closeHandler}>X</button>
                <h1 className='Bookmarks-Title-Text'>Apps</h1>
              </div>
              <div className='Apps-Body'>
              <div class="add-to-body">
                <p> here will be some Apps</p>
              </div>




            </div>
          </div>
        );
      }
}

export default AppsTab;
