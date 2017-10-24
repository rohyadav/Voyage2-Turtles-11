import React, { Component } from 'react';
import '../styles/App.css';
import ReactDOM from 'react-dom';
import { Notes, EmptyContainer } from '../components/Notes';
import Bookmarks from '../components/Bookmarks';
import Googlesearch from '../components/Googlesearch';
import { TodoList } from '../components/todoList.js';

class NotesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility: false,
      iconLink: './assets/Icons_COLOR-04.png',
      quantity: 0
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_background-04.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR-04.png' });
  }

  render() {
    return (<div className="item note-item">
      {/* <div className='notes-wrapper'>      */}
      {/* <div className='notes-text'> */}
      <a href="#"
        // onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Notes" />
      </a>
      <p>Notes</p>
      <button className="countButton">{this.state.quantity}</button>
    </div>
    );
  }
}


class BookmarksButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/Icons_COLOR-05.png',
    };

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
      iconLink: './assets/Icons_COLOR-02.png',
    };

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
        onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Todos button" />
      </a>
      <p>Todos</p>
    </div>);
  }
}



class GmailButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/mail.png',
    };
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/mail_hover.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/mail.png' });
  }
  render() {
    return (
      <div className="item">
        <a href="https://accounts.google.com/signin/v2/sl/pwd?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%3Ftab%3Dwm&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
          onMouseOver={this.iconChangeOnHover}
          onMouseOut={this.iconChangeOnOut} >
          <img src={this.state.iconLink} alt="gmail" />
        </a>
        <p>Gmail</p>
      </div>
    );
  } 
}

class GithubButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/Icons_COLOR_backgrounds_github.png',
    };
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_backgrounds_github_hover.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_COLOR_backgrounds_github.png' });
  }
  render() {
    return (
      <div className="item">
        <a href="https://github.com/"
          onMouseOver={this.iconChangeOnHover}
          onMouseOut={this.iconChangeOnOut} >
          <img src={this.state.iconLink} alt="github" />
        </a>
        <p>Github</p>
      </div>
    );
  } 
}

function tab_open() {
  document.getElementById("main").style.marginRight = "300px";
}

function tab_close() {
  document.getElementById("main").style.marginRight = "0%";
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTabOpen: "false",
      notesTabOpen: "false",
      bookmarksTabOpen: "false",
      time: new Date().toLocaleTimeString(),
    };
    console.log(this.state.time);
  }

  time = () => {
    let d = new Date();
    this.setState({time: d.toLocaleTimeString() });
    return this.state.time;
  }
    toogleVisibility = (param, event) => {
    switch(param) {
      // todo icon pressed
      case "todo":
        switch (this.state.todoTabOpen) {
          case "true":
            this.setState({todoTabOpen: "false"});
            this.setState({notesTabOpen: "false"});
            this.setState({bookmarksTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_close();
            break;
          case "false":
            this.setState({todoTabOpen: "true"});
            this.setState({notesTabOpen: "false"});
            this.setState({bookmarksTabOpen: "false"});
            ReactDOM.render(<TodoList closeHandler={this.toogleVisibility} />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_open();
            break;
          default:
            break;
        }
        break;
      // notes icon pressed
      case "notes":
        switch (this.state.notesTabOpen) {
          case "true":
            this.setState({todoTabOpen: "false"});
            this.setState({notesTabOpen: "false"});
            this.setState({bookmarksTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_close();
            break;
          case "false":
            this.setState({todoTabOpen: "false"});
            this.setState({notesTabOpen: "true"});
            this.setState({bookmarksTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<Notes closeHandler={this.toogleVisibility} />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_open();
            break;
          default:
            break;
        }
        break;
      // bookmarks icon pressed
      case "bookmarks":
        switch (this.state.bookmarksTabOpen) {
          case "true":
            this.setState({todoTabOpen: "false"});
            this.setState({notesTabOpen: "false"});
            this.setState({bookmarksTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_close();
            break;
          case "false":
            this.setState({todoTabOpen: "false"});
            this.setState({notesTabOpen: "false"});
            this.setState({bookmarksTabOpen: "true"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<Bookmarks closeHandler={this.toogleVisibility} />, document.getElementById('bookmarks'));
            tab_open();
            break;
          default:
            break;
        }
        break;
    // the exit button from one of the open tabs have been pressed
    default:
        this.setState({todoTabOpen: "false"});
        this.setState({notesTabOpen: "false"});
        this.setState({bookmarksTabOpen: "false"});
        ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
        ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
        ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
        tab_close();
    }

  }
  render() {
    console.log("render app");
    return (
      <div id="#App" className="App">

        <div className="main">

          <div className="main-top" id="main">

            <div className="time">
              {this.state.time}
              </div>
            <div className="search-area">
              <Googlesearch types={['Web', 'Images', 'News', 'Videos', 'Maps']} />
            </div>

            <div id='icons'>
              <div className="main-grid">
                <div className="item">
                  <img src="assets/Icons_COLOR_background-01.png" alt="Weather" />
                  <p>Weather</p>
                </div>
                  <div onClick={this.toogleVisibility.bind(this, "todo")}>
                    <TodosButton  />
                  </div>
                <div className="item">
                  <img src="assets/Icons_COLOR-03.png" alt="Apps" />
                  <p>Apps</p>
                </div>
                  <div onClick={this.toogleVisibility.bind(this, "bookmarks")}>
                    <BookmarksButton />
                  </div>
                
                  <div onClick={this.toogleVisibility.bind(this, "notes")}>
                    <NotesButton  />
                  </div> 

                <div className="item">
                  <img src="assets/Icons_COLOR-06.png" alt="History" />
                  <p>History</p>
                </div>
                <GmailButton />
                <GithubButton />
              </div> {/* .main-grid */}
              </div> {/* #icons */}
          </div> {/* .main-top */}
          

          <div id='tabs'>
            <aside>
              <div id="weather">
              </div>
              <div id="todo">
              </div>
              <div id="apps">
              </div>
              <div id="notes" >
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
        </div> {/* .main */}
        <footer className="footerText">
          <p className="rightFooter">Project by Chingu Turtles Team 11</p>
          <p className="leftFooter">Photos by Natasha Sadikin</p>
        </footer>
      </div> // .App
    );
  }
}

export default App;
