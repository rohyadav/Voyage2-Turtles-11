import React, { Component } from 'react';
import '../styles/History.css';

// Phrase Brainstorm
// Recent | Most | Clear
// Recent History | Frequent History | Clear History
// Recently Visted | Most Visited | Clear History

let historyArr = []; // need array to use .push
let historyArrF = []; 

const microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
const oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;

/* eslint-disable */

chrome.history.search({
        text: '',              // Return every history item
        startTime: oneWeekAgo, // that was accessed less than one week ago.
        maxResults: 40
    },
    function(historyItems) {
        // console.log('historyItems', historyItems);

        // Extract historyItems object
        for (let i = 0; i < historyItems.length; i++) {
            historyArr.push(historyItems[i]);
        }

    });
    // console.log('updated historyArray', historyArr);

chrome.topSites.get(
    function(mostVisitedItems) {
        // console.log('mostVisitedItems', mostVisitedItems);
        for (let i = 0; i < mostVisitedItems.length; i++) {
            historyArrF.push(mostVisitedItems[i]);
        }
    });

/* eslint-enable */
class History extends Component { // Parent component

    constructor(props) {
        super(props);
        this.state = {
            selected: 'Recent History',
            historyArr: historyArr,
            historyArrSt: historyArr,
            searchInput: ''
        };
    }

    handleRecentClick = () => {
        this.setState({ selected: 'Recent History' });
    }

    handleFrequentClick = () => {
        this.setState({ selected: 'Frequent History' })
    }

    handleChange = (event) => {
        this.setState({ searchInput: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault(); // Else page refreshes on submit

        const source = this.state.searchInput.toLowerCase();
        
        // console.log('source', source);
        let collection = this.state.historyArr;
        // console.log('collection', collection);
        let collectionFiltered = collection.filter(function(obj) {
            return obj.title.toLowerCase().includes(source) || obj.url.includes(source);
        });
        // console.log('collectionFiltered', collectionFiltered);

        this.setState( {historyArr: collectionFiltered} );
        
    } 

    handleClickDelete = (element, index) => {
        /* eslint-disable */
        chrome.history.deleteUrl({url: element.url});
        /* eslint-enable */
        // console.log('history array state', this.state.historyArrSt);
        this.setState(state => {
            state.historyArrSt.splice(index, 1);
            return {historyArrSt: state.historyArrSt};
        });
      }
    
    handleClickClearAll = () => {
        /* eslint-disable */
        chrome.history.deleteAll(function() {});
         /* eslint-enable */
        this.setState({historyArr: []});
    }

    render() {

        return (
            <div className='history-tab'>
                <header className='history-header'>
                    <button className='notesExitButton' onClick={this.props.closeHandler}>X</button>
                    <h1 className='Notes-Title-Text'>History</h1>
                </header>
                <div className='Notes-Body'>
                    <form className='h-form'
                        onSubmit={this.handleSubmit}>
                        <input className='SearchBox h-searchbox'
                            type='text'
                            placeholder='Search History' 
                            onChange={this.handleChange}/>
                            {/* onChange={this.handleChange} */}
                        <button className='h-button-s' type='submit'>
                            <i className='fa fa-search h-search-icon' aria-hidden='true'></i>
                            <span className='sr-only'>search icon</span>
                        </button>
                    </form>
                    <div className='h-options'>
                        <center >
                            <span
                                className={`historyFilter ${this.state.selected === 'Recent History' ? 'descrip-active' : 'descrip-inactive'}`}
                                onClick={this.handleRecentClick}>
                                Recently Visited
                            </span>
                            <span
                                className={`historyFilter ${this.state.selected === 'Frequent History' ? 'descrip-active' : 'descrip-inactive'}`}
                                onClick={this.handleFrequentClick}>
                                Most Visited
                            </span>
                        </center>
                    </div>
                    <div className='historyClearHistory descrip-inactive'
                        onClick={this.handleClickClearAll}>
                        Clear History
                    </div>
                    {
                        (this.state.selected === 'Frequent History')
                        ? <HistoryListF
                            historyArrF={historyArrF} />
                            
                        : <HistoryList
                            historyArr={this.state.historyArr} 
                            handleClickDelete={this.handleClickDelete}/>
                    }
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
            {props.historyArrF.map((element, index) =>
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
            src={`chrome://favicon/${props.element.url}`} 
            alt='favicon' />
            <a href={props.element.url} className='url-url' target='_blank'>
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
                    key={element.id}
                    handleClickDelete={props.handleClickDelete.bind(this, element, index)}/>
            ) }
        </div>
    );

}

const HistoryItem = (props) => {

    return (
        <div className='url-item'>
            <img className='url-icon'
                src={`chrome://favicon/${props.element.url}`} 
                alt='favicon' />
            <a href={props.element.url} 
                className='url-url'
                target='_blank' >
                    {props.element.title
                    ? props.element.title
                    : props.element.url}
            </a>
            <div className='h-del-icon'
                onClick={props.handleClickDelete}> 
                {/* .bind(this, element, index) */}
                <i class='fa fa-minus' aria-hidden='true' title='Click to delete'></i>
            </div>
        </div>
    );
}

export default History