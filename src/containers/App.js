import React, { Component } from 'react';
import '../styles/App.css';
import ReactDOM from 'react-dom';
// import logo from './logo.svg'; (Example of how to import images)
import { Notes, EmptyContainer } from '../components/Notes';
import Bookmarks from '../components/Bookmarks';
import Googlesearch from '../components/Googlesearch';
import { TodoList } from '../components/todoList.js';

class NotesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      iconLink: './assets/Icons_COLOR-04.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-04.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-04.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Notes" />
      </a>
      <p>Notes</p>
    </div>
    );
  }
}

class BookmarksButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      iconLink: './assets/Icons_COLOR-05.png',
    };

  }
  toggleVisibility = () => {
    this.setState(prevState => ({ visibility: !prevState.visibility }));
    if (this.state.visibility === true) {
      return ReactDOM.render(<Bookmarks />, document.getElementById('bookmarks'));
    } else {
      return ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
    }
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-05.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-05.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.toggleVisibility}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Bookmarks" />
      </a>
      <p>Bookmarks</p>
    </div>);
  }
}


class TodosButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      iconLink: './assets/Icons_COLOR-02.png',
    };

  }
  toggleVisibility = () => {
    this.setState(prevState => ({ visibility: !prevState.visibility }));
    if (this.state.visibility === true) {
      return ReactDOM.render(<TodoList />, document.getElementById('todo'));
    } else {
      return ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
    }
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-02.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-02.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.toggleVisibility}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Bookmarks" />
      </a>
      <p>Todoes</p>
    </div>);
  }
}



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesVisibility: false,
    };
  }

  toggleNotesVisibility = () => {
    const newVisibility = !this.state.notesVisibility;
    this.setState(prevState => ({ notesVisibility: !prevState.notesVisibility }));
    if (newVisibility) {
      ReactDOM.render(<Notes closeHandler={this.toggleNotesVisibility} />, document.getElementById('notes'));
    } else {
      ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
    }
  }

  render() {
    console.log("render app");
    return (
      <div className="App">

        <div className="main">

          <div className="main-top">

            <div className="time">
              11:45 PM
              </div>

            <div className="search-area">
              {/* <div className="search-type">
                <div className="type-item">Web</div>
                <div className="type-item">Images</div>
                <div className="type-item">News</div>
                <div className="type-item">Videos</div>
                <div className="type-item">Maps</div>
              </div> */}
              <Googlesearch />
              {/* <div className="search-box">
                  <div className="box-item">Google</div>
                </div> */}
            </div>

            <div id='tabs'>
              <aside>
                <div id="weather">
                </div>
                <div id="todo">
                </div>
                <div id="apps">
                </div>
                <div id="notes">
                </div>
                <div id="bookmarks">
                </div>
                <div id="history">
                </div>
                <div id="placeholder1">
                </div>
                <div id="placeholder2">
                </div>
              </aside>
            </div>
            <div id='icons'>
              <div className="main-grid">
                <div className="item">
                  <img src="assets/Icons_COLOR_background-01.png" alt="Weather" />
                  <p>Weather</p>
                </div>
                { /*<div className="item">
                  <img src="assets/Icons_COLOR-02.png" alt="To Dos" />
                  <p>To Dos</p>
                </div> */ }
                <TodosButton />
                <div className="item">
                  <img src="assets/Icons_COLOR-03.png" alt="Apps" />
                  <p>Apps</p>
                </div>
                <BookmarksButton />
                <NotesButton clickHandler={this.toggleNotesVisibility} />
                <div className="item">
                  <img src="assets/Icons_COLOR-06.png" alt="History" />
                  <p>History</p>
                </div>
                <div className="item">
                  <img src="assets/Icons_COLOR_background-01.png" alt="Placeholder" />
                  <p>Placeholder</p>
                </div>
                <div className="item">
                  <img src="assets/Icons_COLOR_background-01.png" alt="Placeholder" />
                  <p>Placeholder</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
