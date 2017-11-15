import React, { Component } from 'react';
import '../styles/App.css';
import ReactDOM from 'react-dom';
import { Notes, EmptyContainer } from '../components/Notes';
import { Bookmarks } from '../components/Bookmarks';
import GoogleSearch from '../components/GoogleSearch';
import { TodoList } from '../components/todoList.js';
import { Weather } from '../components/Weather.js';
import { NotesQty } from '../components/Notes.js';
import rndomImgIcon from '../assets/turtle_green.png';
import AppsTab from '../components/AppsTab.js';
import History from '../components/History.js';
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
    let todoArrLenInit;
    if (localStorage["todoData-todoArr"] === undefined || localStorage["todoData-todoArr"] === null) {
      todoArrLenInit = 0;
    } else {
      todoArrLenInit = JSON.parse(localStorage["todoData-todoArr"]).length
    };
    return (<div className="item">
      <a
        onClick={this.props.clickHandler}
        onMouseOver={this.iconChangeOnHover}
        onMouseOut={this.iconChangeOnOut}>
        <img src={this.state.iconLink} alt="Todos button" />
      </a>
      <p>Todos</p>
      <button id="todoQty" className="countButton">{todoArrLenInit}</button>
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
          onMouseOut={this.iconChangeOnOut}
          target="_blank"
          rel="noopener noreferrer">
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
          onMouseOut={this.iconChangeOnOut}
          target="_blank"
          rel="noopener noreferrer">
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
class Time extends React.Component {
  formatTime = () => {
    let currentDate = new Date();
    let timeHourString = (currentDate.getHours() % 12) === 0 ? "12" : (currentDate.getHours() % 12);
    let timeMinuteString = (currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes());
    let timeString = timeHourString + ":" + timeMinuteString;
    currentDate.getHours() >= 12 ? timeString += " PM" : timeString += " AM";
    return timeString;
  }
  constructor(props) {
    super(props);
    this.state = {
      time: this.formatTime()
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: this.formatTime()
    });
  }
  render() {
    return (
      <div className="time">{this.state.time}</div>
    )
  }
}

/* =========================
 BACKGROUND IMAGE LOCALSTORAGE
 =========================== */

let bgImgVariable;

if (!localStorage.getItem('bgImgStored')) {
  bgImgVariable = bg1;
} else {
  bgImgVariable = localStorage.getItem('bgImgStored')
}

/* =========================
 MAIN APP COMPONENT - RENDERS ENTIRE PAGE
 =========================== */
const TabType = {
  TODO: 0,
  NOTES: 1,
  BOOKMARKS: 2,
  HISTORY: 3,
  WEATHER: 4,
  APPS: 5,
  COUNT: 6, // Update this as tab type increases.
}

const TABS = [
  { divName: "todo", domElem: <TodoList closeHandler={AppToggleVisibility} /> },
  { divName: "notes", domElem: <Notes closeHandler={AppToggleVisibility} /> },
  { divName: "bookmarks", domElem: <Bookmarks closeHandler={AppToggleVisibility} /> },
  { divName: "history", domElem: <History closeHandler={AppToggleVisibility} /> },
  { divName: "weather", domElem: <Weather closeHandler={AppToggleVisibility} /> },
  { divName: "apps", domElem: <AppsTab closeHandler={AppToggleVisibility} /> },
];

let APP_COMPONENT_INSTANCE = {};
function AppToggleVisibility(param, event)
{
  APP_COMPONENT_INSTANCE.toogleVisibility(param, event);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIsOpen: [],
      image: bgImgVariable,
      time: ""
    };

    APP_COMPONENT_INSTANCE = this;
    for (var i = 0; i < TabType.COUNT; ++i) {
      this.state.tabIsOpen.push(false);
    }
  }

  toogleVisibility = (param, event) => {
    let newOpenTabs = [];
    for (var i = 0; i < TabType.COUNT; ++i) {
      newOpenTabs.push(false);
    }

    switch (param) {
      // todo icon pressed
      case "todo":
        newOpenTabs[TabType.TODO] = !this.state.tabIsOpen[TabType.TODO];
        break;
      // notes icon pressed
      case "notes":
        newOpenTabs[TabType.NOTES] = !this.state.tabIsOpen[TabType.NOTES];
        break;
      // bookmarks icon pressed
      case "bookmarks":
        newOpenTabs[TabType.BOOKMARKS] = !this.state.tabIsOpen[TabType.BOOKMARKS];
        break;
      // history icon pressed
      case "history":
        newOpenTabs[TabType.HISTORY] = !this.state.tabIsOpen[TabType.HISTORY];
        break;
      case "weather":
        newOpenTabs[TabType.WEATHER] = !this.state.tabIsOpen[TabType.WEATHER];
        break;
      case "apps":
        newOpenTabs[TabType.APPS] = !this.state.tabIsOpen[TabType.APPS];
        break;
      // the exit button from one of the open tabs have been pressed
      default:
        //this.allTabsClosed();
    }

    this.setState({tabIsOpen : newOpenTabs});
  }

  /* ---- Background Image ---- */
  backgroundChange = () => {
    const bgArray = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9,
      bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17];
    let randomNumber = Math.floor(Math.random() * (bgArray.length));
    let bgImage = bgArray[randomNumber];
    this.setState({ image: bgImage }, () => localStorage.setItem('bgImgStored', this.state.image)); // Works with callback
  }

  render() {

    let bgStyle = {
      backgroundImage: `url(${this.state.image})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
    }

    // For all the tabs, determine their visibility and inject the correct DOM elements into the page.
    let tabPanes = [];
    let anyTabsOpen = false;
    for (var i = 0; i < TabType.COUNT; ++i) {
      if (this.state.tabIsOpen[i]) {
        tabPanes.push(<div id={TABS[i].divName}>{TABS[i].domElem}</div>);
        anyTabsOpen = true;
      }
      else {
        tabPanes.push(<div id={TABS[i].divName}><EmptyContainer/></div>);
      }
    }

    let mainStyle = {marginRight : "0px"};
    if (anyTabsOpen) {
      mainStyle = {marginRight : "300px"};
    }

    return (
      <div className="App" style={bgStyle} >
        <div className="main" id="main" style={mainStyle}>
          <div className="main-content">
            <div className="main-top" >
              <Time />
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
                  } />
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
              onClick={this.backgroundChange}
              title="Click to change background" />
            <p className="leftFooter">Photos by Natasha Sadikin</p>
            {/*<div className="footer-margin"></div>*/}
          </footer>
        </div> {/* .main */}{/* controls what part of main will shift when tab opens */}

        <div id='tabs'>
          {tabPanes}
        </div>

      </div> // end of .App container
    );
  }
}


export default App;
