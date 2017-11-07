import React, { Component } from 'react';
import '../styles/History.css';

// Get URLs through Chrome API
// Pass URLs down as a prop

const HISTORY = [
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

const HISTORY_F = [
    'about:blank',
    'about:srcdoc',
    'http://localhost:3000/',
    'https://www.youtube.com/',
    'https://github.com/',
    'https://github.com/chingu-coders/Voyage2-Turtles-11',
    'https://github.com/chingu-coders/Voyage2-Turtles-11/commits/DevelopmentBranch',
    'https://chingu-voyage-2.slack.com/messages',
    'https://mail.google.com/mail/u/0/',
    'https://www.nytimes.com/',
]

// Recent | Most/Frequent | Clear
// Recent History | Frequent History | Clear History

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
                        ? <HistoryList
                            history={HISTORY} />
                        : <HistoryListF
                            historyF={HISTORY_F} />
                    }
                </div>
            </div>
        )
    }

} //  History component

const HistoryList = (props) => {
    
    // const history = props.history;
    return (
        <div className='url-container'>
            { props.history.map( (element, index) =>
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
            <img className='url-icon'src='http://res.cloudinary.com/t3unfxn28/image/upload/v1509732740/turtle-green-16_k0nvvb.png'/>
            <div className='url-url'>{props.element}</div>
        </div>
    );
}

const HistoryListF = (props) => {
    
        return (
            <div className='url-container'>
                { props.historyF.map( (element, index) =>
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
            <img className='url-icon'src='http://res.cloudinary.com/t3unfxn28/image/upload/v1509732740/turtle-green-16_k0nvvb.png'/>
            <div className='url-url'>{props.element}</div>
        </div>
    );
}

export default History
