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
    'https://github.com/chingu-coders/Voyage2-Turtles-11/commits/DevelopmentBranch'
]

class History extends Component { // Parent component
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         key: value,
    //     };
    // }

    render() {
        return (
            <div>
                <header className='history-header'>
                    <button className='notesExitButton' onClick={this.props.closeHandler}>X</button>
                    <h1 className='Notes-Title-Text'>History</h1>
                </header>
                <div className='Notes-Body'>
                    <HistoryList history={HISTORY} />
                </div>
            </div>
        )
    }

} //  History component

const HistoryList = (props) => {

    return (
        <div>
            { props.history.map( (element) => <HistoryItem element={element} />) }
        </div>
    );

}

// This may be unnecessary
const HistoryItem = (props) => {
    return (
        <div>
            {props.element}
        </div>
    );
}

export default History