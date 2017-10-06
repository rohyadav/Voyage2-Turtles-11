import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import Notes from './components/Notes';
import Bookmarks from './components/Bookmarks';
import registerServiceWorker from './registerServiceWorker';


class NotesButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            iconLink: './assets/Icons_COLOR-04.png',
        };
    
    }
    toggleVisibility = () =>{
        this.setState(prevState => ({visibility : !prevState.visibility}));
        if (this.state.visibility === true) {
            return ReactDOM.render(<Notes />, document.getElementById('notes'));
        } else {
            return ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
        }
    }
    iconChangeOnHover = () => {
        console.log(this.state.iconLink);
        this.setState({iconLink: './assets/Icons_COLOR_background-04.png'});
    }
    iconChangeOnOut = () => {
        console.log(this.state.iconLink);
        this.setState({iconLink: './assets/Icons_COLOR-04.png'});
    }
    
    render() {
        return ( <div className="item">
                    <a href="#"  
                        onClick={this.toggleVisibility} 
                        onMouseOver={this.iconChangeOnHover} 
                        onMouseOut={this.iconChangeOnOut}>
                        <img src={this.state.iconLink} alt="Notes"/>
                    </a>
                    <p>Notes</p>
            </div> );
    }
}

class BookmarksButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            iconLink: './assets/Icons_COLOR-05.png',
        };
    
    }
    toggleVisibility = () =>{
        this.setState(prevState => ({visibility : !prevState.visibility}));
        if (this.state.visibility === true) {
            return ReactDOM.render(<Bookmarks />, document.getElementById('bookmarks'));
        } else {
            return ReactDOM.render(<EmptyContainer />, document.getElementById('bookmarks'));
        }
    }
    iconChangeOnHover = () => {
        console.log(this.state.iconLink);
        this.setState({iconLink: './assets/Icons_COLOR_background-05.png'});
    }
    iconChangeOnOut = () => {
        console.log(this.state.iconLink);
        this.setState({iconLink: './assets/Icons_COLOR-05.png'});
    }
    
    render() {
        return ( <div className="item">
                    <a href="#"  
                        onClick={this.toggleVisibility} 
                        onMouseOver={this.iconChangeOnHover} 
                        onMouseOut={this.iconChangeOnOut}>
                        <img src={this.state.iconLink} alt="Bookmarks"/>
                    </a>
                    <p>Bookmarks</p>
            </div> );
    }
}
class Icons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-grid">
                <div className="item">
                    <img src="assets/Icons_COLOR_background-01.png" alt="Weather"/>
                    <p>Weather</p>
                </div>
                <div className="item">
                    <img src="assets/Icons_COLOR-02.png" alt="To Dos"/>
                    <p>To Dos</p>
                </div>
                <div className="item">
                    <img src="assets/Icons_COLOR-03.png" alt="Apps"/>
                    <p>Apps</p>
                </div>
                <BookmarksButton />
                <NotesButton />
                <div className="item">
                    <img src="assets/Icons_COLOR-06.png" alt="History"/>
                    <p>History</p>
                </div>
                <div className="item">
                    <img src="assets/Icons_COLOR_background-01.png" alt="Placeholder"/>
                    <p>Placeholder</p>
                </div>
                <div className="item">
                    <img src="assets/Icons_COLOR_background-01.png" alt="Placeholder"/>
                    <p>Placeholder</p>
                </div>
          </div>
        )
    }
}

class Tabs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
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
        )
    }
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

ReactDOM.render(<Icons />, document.getElementById('icons'));
ReactDOM.render(<Tabs />, document.getElementById('tabs'));

registerServiceWorker();