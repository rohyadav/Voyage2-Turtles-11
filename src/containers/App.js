import React, { Component } from 'react';
import '../styles/App.css';
import ReactDOM from 'react-dom';
import { Notes, EmptyContainer } from '../components/Notes';
import Bookmarks from '../components/Bookmarks';
import GoogleSearch from '../components/GoogleSearch';
import { TodoList } from '../components/todoList.js';
import { Weather, Empty } from '../components/Weather.js';
import { NotesQty } from '../components/Notes.js';
import rndomImgIcon from '../assets/turtle_green.png';

import bg1 from '../assets/wallpapers/01.jpg';
import bg2 from '../assets/wallpapers/02.JPG';
import bg3 from '../assets/wallpapers/03.JPG';
import bg4 from '../assets/wallpapers/04.JPG';
import bg5 from '../assets/wallpapers/05.JPG';
import bg6 from '../assets/wallpapers/06.JPG';
import bg7 from '../assets/wallpapers/07.JPG';
import bg8 from '../assets/wallpapers/08.jpg';
import bg9 from '../assets/wallpapers/09.JPG';
import bg10 from '../assets/wallpapers/10.jpg';
import bg11 from '../assets/wallpapers/11.JPG';
import bg12 from '../assets/wallpapers/12.JPG';
import bg13 from '../assets/wallpapers/13.JPG';
import bg14 from '../assets/wallpapers/14.JPG';
import bg15 from '../assets/wallpapers/15.jpg';
import bg16 from '../assets/wallpapers/16.JPG';
import bg17 from '../assets/wallpapers/17.jpg';
import bg18 from '../assets/wallpapers/18.jpg';

class NotesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility: false,
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
    return (<div className="item note-item">
      <a href="#"
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Notes" />
      </a>
      <p>Notes</p>
      <button id="notesQty" className="countButton"><NotesQty /></button>
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

class WeatherButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      iconLink: 'assets/Icons_COLOR_background-01.png',
    };

  }
  toggleVisibility = () => {
    this.setState(prevState => ({ visibility: !prevState.visibility }));
    if (this.state.visibility === true) {
      ReactDOM.render(<Weather />, document.getElementById('weather'));
      tab_open();
    } else {
      ReactDOM.render(<Empty />, document.getElementById('weather'));
      tab_close();
    }
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: 'assets/Icons_google logo-13.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: 'assets/Icons_COLOR_background-01.png' });
  }

  render() {
    return (<div className="item">
      <a href="#"
        onClick={this.toggleVisibility}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Weather Button" />
      </a>
      <p>Weather</p>
    </div>);
  }
}

function tab_open() {
  document.getElementById("main").style.marginRight = "300px";
}

function tab_close() {
  document.getElementById("main").style.marginRight = "0%";
}

const Time = () => {
  let currentDate = new Date();
  let timeHourString = (currentDate.getHours() % 12) === 0 ? "12" : (currentDate.getHours() % 12);
  let timeMinuteString = (currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes());
  let timeString = timeHourString + ":" + timeMinuteString;
  currentDate.getHours() >= 12 ? timeString += " PM" : timeString += " AM";

  return (
    <div>{timeString}</div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTabOpen: "false",
      notesTabOpen: "false",
      bookmarksTabOpen: "false",
      image: bg1
    };
  }

  time = () => {
    let d = new Date();
    this.setState({ time: d.toLocaleTimeString() });
    return this.state.time;
  }
  toogleVisibility = (param, event) => {
    switch (param) {
      // todo icon pressed
      case "todo":
        switch (this.state.todoTabOpen) {
          case "true":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_close();
            break;
          case "false":
            this.setState({ todoTabOpen: "true" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
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
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_close();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "true" });
            this.setState({ bookmarksTabOpen: "false" });
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
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            tab_close();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "true" });
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
        this.setState({ todoTabOpen: "false" });
        this.setState({ notesTabOpen: "false" });
        this.setState({ bookmarksTabOpen: "false" });
        ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
        ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
        ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
        tab_close();
    }
  }
  
  backgroundChange = () => {
    let bgImage = this.state.image;
    const bgArray = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, 
    bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17, bg18];
    let randomNumber = Math.floor(Math.random() * (bgArray.length));
    bgImage = bgArray[randomNumber];
    this.setState({image: bgImage});
  }
    
  render() {

    let bgStyle = {
      backgroundImage: `url(${this.state.image})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }

    return (
      <div className="App" style={bgStyle}>
        <div className="main" id="main">
          <div className="main-content">
            <div className="main-top" >
              <div className="time">
                <Time />
              </div>
              <div className="search-area">
                <GoogleSearch
                  types={
                    [
                      {
                        'Web': 'https://www.google.com/search?q=',
                        'Images': 'https://www.google.com/search?tbm=isch&q=',
                        'News': 'https://www.google.com/search?tbm=nws&q=',
                        'Videos': 'https://www.google.com/search?tbm=vid&q=',
                        'Maps': 'https://www.google.com/maps/preview?q='
                      }
                    ]
                  }
              />
              </div>
            </div> {/* .main-top */}
            <div id='icons'>
              <div className="main-grid">
                <div onClick={this.toogleVisibility.bind(this, "weather")}>
                  <WeatherButton />
                </div>
                <div onClick={this.toogleVisibility.bind(this, "todo")}>
                  <TodosButton />
                </div>
                <div className="item">
                  <img src="assets/Icons_COLOR-03.png" alt="Apps" />
                  <p>Apps</p>
                </div>
                <div onClick={this.toogleVisibility.bind(this, "bookmarks")}>
                  <BookmarksButton />
                </div>

                <div onClick={this.toogleVisibility.bind(this, "notes")}>
                  <NotesButton />

                </div>
                <div className="item">
                  <img src="assets/Icons_COLOR-06.png" alt="History" />
                  <p>History</p>
                </div>
                <GmailButton />
                <GithubButton />
              </div> {/* .main-grid */}
            </div> {/* #icons */}
          </div> {/* .main-content */}
          <footer>
            <img 
              className="footerIcon" 
              src={rndomImgIcon} 
              alt="Turtles Cohort" 
              onClick={this.backgroundChange} />
            <div className="footerText">
              <p className="leftFooter">Photos by Natasha Sadikin</p>
            </div>
          </footer>
        </div> {/* .main */}{/* controls what part of main will shift when tab opens */}

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
          </aside>
        </div>

      </div> // end of .App container
    );
  }
}


export default App;
