import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class GoogleAutosuggest extends Component {
    
    render() {
        /* --------- Return conditionals based on fetch state --------- */
        if (!this.props.suggestions) { // Array is undefined
            return (<div></div>); 
        }
        else if (this.props.suggestions[0] === 'initialized state') { // AJAX hasn't kicked in yet
            // console.log('([2] Before state is updated with Wiki\'s data)', this.props.suggestions[0]); 
            return (<div></div>);
        }
        else if (this.props.suggestions[0] === 'Undefined') { // User hasn't typed anything
            // console.log('([2] State has been updated with Wiki\'s default data, no user input)', this.props.suggestions[0]);
            return (<div></div>);
        }
        // else if (!this.props.autoListOpen) {
        //     return (<div></div>);
        // }
        
        /* --------- If data is fetched, generate items --------- */
        const suggestions = this.props.suggestions.slice(0,6);
        // console.log('[2] Sliced data from user input', suggestions);
        let autoList;

        autoList = suggestions.map( (suggestion, index) =>
            <AutoItem
                key={index}
                suggestion={suggestion} 
                handleClickAuto={this.props.handleClickAuto}/>                   
        );

        return (
            <div className='auto-container'>
                    <div className='auto-list'>
                        {autoList}
                    </div>
            </div>
        );

    } // render()

} // GoogleAutosuggest Component

GoogleAutosuggest.propTypes = {
    suggestions: PropTypes.array.isRequired // Check if array prop is passed down
}

const AutoItem = (props) => {
    const currentAuto = props.suggestion;

    return ( 
        <span 
            className='auto-link' 
            onClick={props.handleClickAuto.bind(this, currentAuto)}>            
                {currentAuto}
        </span>
  );
};

AutoItem.propTypes = {
    suggestion: PropTypes.string.isRequired
}

export default GoogleAutosuggest;
