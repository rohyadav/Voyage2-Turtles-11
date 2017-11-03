import React, { Component } from 'react';
// import '../styles/History.css';

// Get URLs through Chrome API
// Pass URLs down as a prop

const URL = [
    'https://www.youtube.com/',
    'https://github.com/chingu-coders/Voyage2-Turtles-11',
    'http://netizenbuzz.blogspot.com/',
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
            <div className='dummy'>
                <h2>Recently Visited Sites</h2>
                <HistoryList/>
            </div>
        )
    }

} //  History component

const HistoryList = (props) => {

    return (
        <div>
            { URL.map( (element) => <HistoryItem element={element} />) }
        </div>
    );

}

// This may be unnecessary
const HistoryItem = (props) => {
    return (
        <div>
            {this.props.element}
        </div>
    );
}

export default History