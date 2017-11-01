import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GoogleAutosuggest extends Component {

        render() {

            if (!this.props.suggestions) { // Wait for fetch, if array is undefined, return empty div.
                return (<div></div>); // parens necessary
                // console.log('[2] Array is undefined', this.props.suggestions[0]); PropTypes will give an error message
            }
            else if (this.props.suggestions[0] === 'initialized state') { //
              console.log('([2] Before state is updated with Wiki\'s data)', this.props.suggestions[0]); // This is 'initialized state' bc AJAX hasn't kicked in yet
              return (<div></div>);
            }
            else if (this.props.suggestions[0] === 'Undefined') { // If user hasn't typed anything, return empty div
                console.log('([2] State has been updated with Wiki\'s default data, no user input)', this.props.suggestions[0]);
                return (<div></div>);
            }

            const suggestions = this.props.suggestions.slice(0,6); // Slice autosuggestion array to 6 items
            // console.log('[2] Sliced data from user input', suggestions);
            let autoList;

            autoList = suggestions.map( (suggestion, index) =>
                <AutoItem
                    key={index}
                    suggestion={suggestion} 
                    handleClickAuto={this.props.handleClickAuto}/>
                    // return keyword unnecessary                    
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

    return ( // return keyword is necessary
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