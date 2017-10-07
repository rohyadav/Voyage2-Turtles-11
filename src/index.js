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
        this.state = {visibility: false};
    }
    toggleVisibility = () =>{
        this.setState(prevState => ({visibility : !prevState.visibility}));
        if (this.state.visibility === true) {
            return ReactDOM.render(<Notes />, document.getElementById('notes'));
        } else {
            return ReactDOM.render(<EmptyContainer />, document.getElementById('notes'));
        }
    }
    render() {
        return ( <div className="item">
                    <a href="#" className='item' onClick={this.toggleVisibility}><img src="assets/Icons_COLOR-04.png" alt="Notes"/></a>
                    <p>Notes</p>
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
                <div className="item">
                    <img src="assets/Icons_COLOR-05.png" alt="Bookmarks"/>
                    <p>Bookmarks</p>
                </div>
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

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Icons />, document.getElementById('icons'));
ReactDOM.render(<Tabs />, document.getElementById('tabs'));

registerServiceWorker();