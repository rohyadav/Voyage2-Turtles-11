import React, { Component } from 'react';
import '../styles/History.css';

// Phrase Brainstorm
// Recent | Most | Clear
// Recent History | Frequent History | Clear History
// Recently Visted | Most Visited | Clear History

const HISTORY_F = [
    'https://www.youtube.com/',
    'https://github.com/chingu-coders/Voyage2-Turtles-11',
    'https://chingu-voyage-2.slack.com/messages',
    'http://localhost:3000/',
    'https://mail.google.com/mail/u/0/',
    'https://github.com/',
    'https://github.com/chingu-coders/Voyage2-Turtles-11/commits/DevelopmentBranch',
    'https://www.nytimes.com/',
    'about:srcdoc',
    'about:blank',
]

/* eslint-disable */

let historyArr = [];
let historyArrF = []; // need array to use .push

const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
const oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
// Track the number of callbacks from chrome.history.getVisits() that we expect to get. When it reaches zero, we have all results.
// var numRequestsOutstanding = 0;

chrome.history.search({
        text: '',              // Return every history item....
        startTime: oneWeekAgo, // that was accessed less than one week ago.
        maxResults: 40
    },
    function(historyItems) {
        console.log('historyItems', historyItems);

        // Extract historyItems object
        for (var i = 0; i < historyItems.length; ++i) {
            historyArr.push(historyItems[i]);
        }

    });
    console.log('updated historyArr', historyArr);

/* eslint-enable */
class History extends Component { // Parent component

    constructor(props) {
        super(props);
        this.state = {
            selected: 'Recent History'
        };
    }

    handleRecentClick = () => {
        this.setState({selected: 'Recent History'})
    }

    handleFrequentClick = () => {
        this.setState({selected: 'Frequent History'})
    }

    render() {

        return (
            <div className='history-tab'>
                <header className='history-header'>
                    <button className='notesExitButton' onClick={this.props.closeHandler}>X</button>
                    <h1 className='Notes-Title-Text'>History</h1>
                </header>
                <div className='Notes-Body'>
                    <form className="h-form"
                        onSubmit={this.handleSubmit}>
                            <input className="SearchBox h-searchbox"
                                type="text"
                                placeholder='Search History'
                                onChange={this.handleChange} />
                            <button className='h-button-s' type='submit'>
                                <i className="fa fa-search h-search-icon" aria-hidden="true"></i>
                                <span className="sr-only">search icon</span>
                            </button>
                    </form>
                    {/* <div className='url-container'> */}
                    <div className='h-options'>
                        <span
                            className='descrip-active'
                            onClick={this.handleRecentClick}>
                                Recently Visited
                        </span>
                        <span
                            className='descrip-inactive'
                            onClick={this.handleFrequentClick}>
                                Most Visited
                        </span>
                        <span className='descrip-inactive'>Clear History</span>
                    </div>
                    {
                        (this.state.selected === 'Frequent History')
                        ? <HistoryListF
                            historyArrF={HISTORY_F} />
                        : <HistoryList
                            historyArr={historyArr} />
                    }
                    {/* </div> */} {/* .url-container */}
                </div> {/* .Notes-Body */}
            </div>
        )
    }

} //  History component

/* ----- FREQUENT HISTORY ----- */

const HistoryListF = (props) => {

    // const history = props.history;
    return (
        <div className='url-container'>
        {/* <div> */}
            { props.historyArrF.map( (element, index) =>
                <HistoryItemF
                    element={element}
                    key={index}/>
            ) }
        </div>
    );

}

const HistoryItemF = (props) => {

    return (
        <div className='url-item'>
            <img className='url-icon' alt="url-icon" src='http://res.cloudinary.com/t3unfxn28/image/upload/v1509732740/turtle-green-16_k0nvvb.png'/>
            <div className='url-url'>{props.element}</div>
        </div>
    );
}

/* ----- RECENT HISTORY ----- */

const HistoryList = (props) => {

    const histArr = props.historyArr;
    let histArrUrl = [];

    for (let i = 0; i < historyArr.length; ++i) {
        histArrUrl.push(histArr[i].url);
    }

        return (

            <div className='url-container'>
            {/* <div> */}
                { histArrUrl.map( (element, index) =>
                    <HistoryItem
                        element={element}
                        key={index}/>
                ) }
            </div>
        );

    }

const HistoryItem = (props) => {

    return (
        <div className='url-item'>
            <img className='url-icon'
            src={`chrome://favicon/${props.element}`}  alt="url-icon" />
            <a href={props.element} className='url-url'>{props.element}</a>
        </div>
    );
}

export default History
/* eslint-disable */
{/* <li className="bookmarks"
    key={bookmarks.index}
    style={{ listStyleImage: "url(chrome://favicon/" + bookmarks.url + ")" }}> */}
/* eslint-enable */