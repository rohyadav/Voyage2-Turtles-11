import React, { Component } from 'react';
import '../styles/History.css';

// Phrase Brainstorm
// Recent | Most | Clear
// Recent History | Frequent History | Clear History
// Recently Visted | Most Visited | Clear History

/* eslint-disable */

let historyArr = []; // need array to use .push
let historyArrF = []; 

// const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
// const oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;

chrome.history.search({
        text: '',              // Return every history item
        // startTime: oneWeekAgo, // that was accessed less than one week ago.
        maxResults: 40
    },
    function(historyItems) {
        console.log('historyItems', historyItems);

        // Extract historyItems object
        for (let i = 0; i < historyItems.length; i++) {
            historyArr.push(historyItems[i]);
        }

    });
    console.log('updated historyArray', historyArr);

chrome.topSites.get(
    function(mostVisitedItems) {
        console.log('mostVisitedItems', mostVisitedItems);
        for (let i = 0; i < mostVisitedItems.length; i++) {
            historyArrF.push(mostVisitedItems[i]);
        }
    });



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

    handleChange = () => {

    }

    handleSubmit = () => {

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
                            historyArrF={historyArrF} />
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

    return (
        <div className='url-container'>
        {/* <div> */}
            { props.historyArrF.map( (element, index) =>
                <HistoryItemF
                    element={element}
                    key={element.url}/>
            ) }
        </div>
    );

}

const HistoryItemF = (props) => {

    return (
        <div className='url-item'>
            <img className='url-icon'
            src={`chrome://favicon/${props.element.url}`} />
            <a href={props.element.url} className='url-url'>
                {props.element.title}
            </a>
        </div>
    );
}

/* ----- RECENT HISTORY ----- */

const HistoryList = (props) => {

        return (

            <div className='url-container'>
            {/* <div> */}
                { props.historyArr.map( (element, index) =>
                    <HistoryItem
                        element={element}
                        key={element.id}/>
                ) }
            </div>
        );

    }

const HistoryItem = (props) => {

    return (
        <div className='url-item'>
            <img className='url-icon'
            src={`chrome://favicon/${props.element.url}`} />
            <a href={props.element.url} 
                className='url-url'>
                    {props.element.title}
            </a>
        </div>
    );
}

export default History

{/* <li className="bookmarks"
    key={bookmarks.index}
    style={{ listStyleImage: "url(chrome://favicon/" + bookmarks.url + ")" }}> */}
