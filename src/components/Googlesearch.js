import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import '../styles/Googlesearch.css';

// import logo from './logo.svg'; (Example of how to import images)

class Googlesearch extends Component {

    constructor() {
        super()
        this.state = {
            userInput: ''
        }
    }

    openNewPage() {
        let userInput = this.state.userInput;
        userInput = this.state.userInput.trim();
        let url = `https://www.google.com/search?q={this.state.userInput}`;
        window.open({url}, '_blank')
    }

    handleChange(event) {
        this.setState({userInput: event.target.value})
    }

    render() {
        return (
            <div>
                <SearchBox
                    onPressEnter={this.openNewPage}
                    onChange={this.handleChange.bind(this)}/>
            </div>
        )
    }
}

// AJAX FUNCTION 
// AUTOSUGGESTION COMPONENT

class SearchBox extends React.Component {

    handleKeyPress(event) {
        if (event.which == 13) {
            this.props.onPressEnter();
        }
    }

    render() {
        return (
            <form className="search-form" target="_blank">
                <input className="search-input-box" type="search" placeholder="Google" onKeyPress={this.handleKeyPress.bind(this)} onChange={this.props.onChange}/> 
                {/* <div className="box-item">Google</div> */}
                {/* value={this.state.userInput} */}
            </form>
        );
    };
}

export default Googlesearch;