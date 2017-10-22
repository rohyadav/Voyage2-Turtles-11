import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Wikipedia initial autosuggestion array (before typing)
// 9 items
// ["Undefined", "Undefined behavior", "Undefined (mathematics)", "Undefined variable", "Undefined Fantastic Object", "Undefined value", "Undefined citizenship", "Undefined primitive", "Unrefined sweetener"]

// Wikipedia autosuggestion array
// 10 items
// ["Tria", "Triangle", "Triad (organized crime)", "Triathlon", "Trial of Michael Jackson", "Triage", "Trial of George Zimmerman", "Triassic", "Triangle Shirtwaist Factory fire", "Trial by ordeal"]

class GoogleAutocomplete extends Component { 
    
        render() {
            if (!this.props.suggestions) { // Wait for fetch, if array is undefined, return empty div.
                return <div></div>
            }
            else if(this.props.suggestions[0] === 'Undefined') { // If user hasn't typed anything, return empty div
                return <div></div>
            }
            const suggestions = this.props.suggestions.slice(0,6); // Slice autosuggestion array to 5 items
            let autoList;
            console.log(suggestions); // This is the initial state bc AJAX hasn't kicked in yet

            autoList = suggestions.map((suggestion, index) =>
                <AutoItem 
                    key={index}
                    suggestion={suggestion} />
                    // return keyword unnecessary
            ); 

            return (
                <ul className='auto-list'>
                    {autoList}
                </ul>
            );
        } // render()
    
    } // GoogleAutocomplete Component
    
GoogleAutocomplete.propTypes = {
    suggestions: PropTypes.array.isRequired // Check if array prop is passed down
}  

const AutoItem = (props) => {
    const currentAuto = props.suggestion;
    return ( // return keyword is necessary
    <li className='auto-list'>
        <a href={`https://www.google.com/search?q=&${currentAuto}`}>
            {props.suggestion}
        </a>
    </li>
  );
};

AutoItem.propTypes = {
    suggestion: PropTypes.string.isRequired
}

export default GoogleAutocomplete;
