import React, { Component } from 'react';
import '../styles/App.css';
import ReactDOM from 'react-dom';
import { Notes, EmptyContainer } from '../components/Notes';
import { Bookmarks } from '../components/Bookmarks';
import GoogleSearch from '../components/GoogleSearch';
import { TodoList } from '../components/todoList.js';
import { Weather } from '../components/Weather.js';
import { NotesQty } from '../components/Notes.js';
import History from '../components/History.js'
import rndomImgIcon from '../assets/turtle_green.png';
import AppsTab from '../components/AppsTab.js';
/* =========================
 WALLPAPER LINKS
 =========================== */
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

/* =========================
 BUTTONS
 =========================== */
class NotesButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility: false,
      iconLink: './assets/Icons_white_white-04.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-07.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white-04.png' });
  }

  render() {
    return (<div className="item note-item">
      <a
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
      iconLink: './assets/Icons_white_white-05.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-14.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white-05.png' });
  }

  render() {
    return (<div className="item">
      <a
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
      iconLink: './assets/Icons_white_white-02.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-12.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white-02.png' });
  }

  render() {
    return (<div className="item">
      <a
        onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Todos button" />
      </a>
      <p>Todos</p>
      <button id="todoQty" className="countButton">0</button>
    </div>);
  }
}

class GmailButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconLink: './assets/Icons_white_white_gmail.png',
    };
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-17.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white_gmail.png' });
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
      iconLink: './assets/Icons_white_white_github.png',
    };
  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-16.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white_github.png' });
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
      iconLink: './assets/Icons_white_white-01.png'
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: 'assets/Icons_white_color_newicons-13.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: 'assets/Icons_white_white-01.png' });
  }

  render() {
    return (<div className="item">
      <a
        onClick={this.toggleVisibility}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Weather Button" />
      </a>
      <p>Weather</p>
    </div>);
  }
}

class AppsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility: false,
      iconLink: './assets/Icons_white_white-03.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-11.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white-03.png' });
  }

  render() {
    return (<div className="item">
      <a
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Apps" />
      </a>
      <p>Apps</p>
    </div>
    );

  }
}

class HistoryButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility: false,
      iconLink: './assets/Icons_white_white-06.png',
    };

  }
  iconChangeOnHover = () => {
    this.setState({ iconLink: './assets/Icons_white_color_newicons-15.png' });
  }
  iconChangeOnOut = () => {
    this.setState({ iconLink: './assets/Icons_white_white-06.png' });
  }

  render() {
    return (<div className="item">
      <a
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="History" />
      </a>
      <p>History</p>
    </div>
    );

  }
}

/* =========================
 CONTROLS TAB OPENING AND CLOSING
 =========================== */
function tab_open() {
  document.getElementById("main").style.marginRight = "300px";
}

function tab_close() {
  document.getElementById("main").style.marginRight = "0%";
}

/* =========================
 MAIN TIME FORMATTING
 =========================== */
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

/* =========================
 MAIN APP COMPONENT - RENDERS ENTIRE PAGE
 =========================== */
 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTabOpen: "false",
      notesTabOpen: "false",
      bookmarksTabOpen: "false",
      historyTabOpen: "false",
      weatherTabOpen: "false",
      autoListOpen: "false",
      appsTabOpen: "false",
      image: bg1
    };
  }

  time = () => {
    let d = new Date();
    this.setState({ time: d.toLocaleTimeString() });
    return this.state.time;
  }
  allTabsClosed = () => {
    this.setState({ todoTabOpen: "false" });
    this.setState({ notesTabOpen: "false" });
    this.setState({ bookmarksTabOpen: "false" });
    this.setState({ historyTabOpen: "false"});
    this.setState({ weatherTabOpen: "false"});
    this.setState({ appsTabOpen: "false"});
    ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
    ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
    ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
    ReactDOM.render(<EmptyContainer />, document.getElementById('history'));
    ReactDOM.render(<EmptyContainer />, document.getElementById('weather'));
    ReactDOM.render(<EmptyContainer />, document.getElementById('apps'));
    tab_close();
  }
  toogleVisibility = (param, event) => {
    switch (param) {
      // todo icon pressed
      case "todo":
        switch (this.state.todoTabOpen) {
          case "true":
            this.allTabsClosed();
            break;
          case "false":
            this.setState({ todoTabOpen: "true" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            this.setState({ historyTabOpen: "false" });
            this.setState({ weatherTabOpen: "false"});
            this.setState({ appsTabOpen: "false"});
            ReactDOM.render(<TodoList closeHandler={this.toogleVisibility} />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('history'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('weather'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('apps'));
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
            this.allTabsClosed();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "true" });
            this.setState({ bookmarksTabOpen: "false" });
            this.setState({ historyTabOpen: "false" });
            this.setState({ weatherTabOpen: "false"});
            this.setState({ appsTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<Notes closeHandler={this.toogleVisibility} />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('history'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('weather'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('apps'));
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
            this.allTabsClosed();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "true" });
            this.setState({ historyTabOpen: "false" });
            this.setState({ weatherTabOpen: "false"});
            this.setState({ appsTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<Bookmarks closeHandler={this.toogleVisibility} />, document.getElementById('bookmarks'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('history'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('weather'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('apps'));
            tab_open();
            break;
          default:
            break;
        }
        break;
      // history icon pressed
      case "history":
        switch (this.state.historyTabOpen) {
          case "true":
            this.allTabsClosed();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            this.setState({ historyTabOpen: "true" });
            this.setState({ weatherTabOpen: "false"});
            this.setState({ appsTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            ReactDOM.render(<History closeHandler={this.toogleVisibility} />, document.getElementById('history'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('weather'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('apps'));
            tab_open();
            break;
          default:
            break;
        }
        break;  
        case "weather":
        switch (this.state.weatherTabOpen) {
          case "true":
            this.allTabsClosed();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            this.setState({ historyTabOpen: "false" });
            this.setState({ weatherTabOpen: "true"});
            this.setState({ appsTabOpen: "false"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('history'));
            ReactDOM.render(<Weather closeHandler={this.toogleVisibility} />, document.getElementById('weather'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('apps'));
            tab_open();
            break;
          default:
            break;
        }
        break;  
        case "apps":
        switch (this.state.appsTabOpen) {
          case "true":
            this.allTabsClosed();
            break;
          case "false":
            this.setState({ todoTabOpen: "false" });
            this.setState({ notesTabOpen: "false" });
            this.setState({ bookmarksTabOpen: "false" });
            this.setState({ historyTabOpen: "false" });
            this.setState({ weatherTabOpen: "true"});
            this.setState({ appsTabOpen: "true"});
            ReactDOM.render(<EmptyContainer />, document.getElementById('todo'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('history'));
            ReactDOM.render(<EmptyContainer />, document.getElementById('weather'));
            ReactDOM.render(<AppsTab closeHandler={this.toogleVisibility} />, document.getElementById('apps'));
            tab_open();
            break;
          default:
            break;
        }
        break;  
      // the exit button from one of the open tabs have been pressed
      default:
        this.allTabsClosed();
    }
  }

  /* ---- Background Image ---- */
  backgroundChange = () => {
    let bgImage = this.state.image;
    const bgArray = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9,
                    bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17];
    let randomNumber = Math.floor(Math.random() * (bgArray.length));
    bgImage = bgArray[randomNumber];
    this.setState({image: bgImage});
  }

  /* ---- AutoSuggestion visibility ---- */
  handleFocus = () => {
    if (!this.state.autoListOpen) {
      document.addEventListener('click', this.handleClickOutside);
    } 
    else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.setState( prevState => ({
      autoListOpen: !prevState.autoListOpen,
   }) );
  }

  handleClickOutside = event => {
    // ignore clicks on search area
    if (this.node.contains(event.target)) {
      return;
    }
    this.handleFocus();
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
      <div className="App" style={bgStyle} >
        <div className="main" id="main">
          <div className="main-content">
            <div className="main-top" >
              <div className="time">
                <Time />
              </div>
              <div className="search-area" ref={ node => { this.node = node; } }>
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
                  autoListOpen={this.state.autoListOpen}
                  handleFocus={this.handleFocus}/>
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
                <div onClick={this.toogleVisibility.bind(this, "apps")}>
                  <AppsButton />
                </div>
                <div onClick={this.toogleVisibility.bind(this, "bookmarks")}>
                  <BookmarksButton />
                </div>
                <div onClick={this.toogleVisibility.bind(this, "notes")}>
                  <NotesButton />
                </div>
                <div onClick={this.toogleVisibility.bind(this, "history")}>
                  <HistoryButton />
                </div>
                <GmailButton />
                <GithubButton />
              </div> {/* .main-grid */}
            </div> {/* #icons */}
          </div> {/* .main-content */}
          <footer>
            <img
              className="footer-icon"
              src={rndomImgIcon}
              alt="Turtles Cohort"
              onClick={this.backgroundChange} />
            <p className="leftFooter">Photos by Natasha Sadikin</p>
            {/*<div className="footer-margin"></div>*/}
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
