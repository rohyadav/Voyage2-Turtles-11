import React, {Component} from 'react';
import '../styles/Googlesearch.css';
import GoogleAutocomplete from './GoogleAutocomplete'

class Googlesearch extends Component { // Parent component

    constructor(props) {
        super(props);
        this.state = { 
            selected: this.props.types[0], // Default value is inherited prop. 'selected' property determines URL
            suggestions: ['intialized state'], // API data 
            autoSelected: null,
            expanded: false
        };
        this.handleClick = this.handleClick.bind(this); // binding is optional bc of arrow fxn's lexical scope
    }

    handleClick = (type, event) => { // Click event in SearchType invokes this fxn. Fxn updates state with selected type
        event.preventDefault();
        this.setState({
          selected: type  
        });
    }

    googleSearch = (query) => { // Submit event in SearchBox invokes this fxn
        let urlType;
        switch(this.state.selected) {
            case 'Web': 
                urlType = 'https://www.google.com/search?q=';
                break;
            case 'Images':
                urlType = 'https://www.google.com/search?tbm=isch&q=';
                break;
            case 'News':
                urlType = 'https://www.google.com/search?tbm=nws&q=';
                break;
            case 'Videos':
                urlType = 'https://www.google.com/search?tbm=vid&q=';
                break;
            case 'Maps':
                urlType = 'https://www.google.com/maps/preview?q=';
                break;
            default: 
                urlType = 'https://www.google.com/search?q='
        }  
        let url = urlType + query
        window.open(url,'_self'); // alternative: _blank
    }

    componentDidMount() {
        this.autoSuggest()
    }

    autoSuggest = (autoQuery) => { // Change event in SearchBox invokes this fxn and passes text input value. Fxn updates state with API autosuggestions
        let apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&redirects=return&search=${autoQuery}`; // Resolve No 'Access-Control-Allow-Origin' header error with '&origin=*'
        fetch(apiUrl)
            .then(response => response.json()) 
            .then(responseData => {
                console.log(responseData);
                this.setState({ suggestions: responseData[1] });          
            })
            .catch(error => {
                console.log('Problem fetching data', error);
            })
    }

    toggleExpand = () => {
        this.setState({expanded: true})
    }

    handleClickAuto = (suggestion) => {
        this.setState({autoSelected: suggestion})
    }

    // PSEUDOCODE
    // fired by clicking a suggestionItem
    // same body code as googleSearch()
    // requires the 'selected' state property -> to pick Google engine URL
    // make sure the selected suggestion variable gets passed up from GoogleAutocomplete
    // append selected suggestion to URL
    autoSearch = (autoSelect) => {
        let urlType;
        switch(this.state.selected) {
            case 'Web': 
                urlType = 'https://www.google.com/search?q=';
                break;
            case 'Images':
                urlType = 'https://www.google.com/search?tbm=isch&q=';
                break;
            case 'News':
                urlType = 'https://www.google.com/search?tbm=nws&q=';
                break;
            case 'Videos':
                urlType = 'https://www.google.com/search?tbm=vid&q=';
                break;
            case 'Maps':
                urlType = 'https://www.google.com/maps/preview?q=';
                break;
            default: 
                urlType = 'https://www.google.com/search?q='
        }  
        let url = urlType + autoSelect
        window.open(url,'_self');
    }

    

    render() {
        return (
            <div>
                <SearchType 
                    types={this.props.types} 
                    selected={this.state.selected}
                    handleClick={this.handleClick}/> 
                <SearchBox 
                    onSearch={this.googleSearch} 
                    onAutoSuggest={this.autoSuggest.bind(this)} // does this need to bound since it's an arrow fxn?
                    onToggleExpand={this.toggleExpand}/>   
                <GoogleAutocomplete 
                    onAutoSearch={this.autoSearch}
                    suggestions={this.state.suggestions}
                    expanded={this.state.expanded}
                    handleClickAuto={this.handleClickAuto}/>
            </div> 
        )
    } 

} //  Googlesearch Component

class SearchType extends React.Component {
    
    render() {

        const types = this.props.types; 

        const spanItems = types.map((type) => // type variable is accessible in handleClick() bc of closure       
            <span 
                key={type} 
                className={this.props.selected === type ? 'is-active' : ''} 
                onClick={this.props.handleClick.bind(this, type)}>
                    {type}
            </span>
        );

        return (
            <div className='search-type'>                
                {spanItems}
            </div>
        );
    }

} // SearchType Component

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            searchInput: ''
        };
    }

    handleChange = event => { // Fxn updates state to input text value, and sends it to parent
        this.setState({ searchInput: event.target.value }); 
        this.props.onAutoSuggest(this.state.searchInput);
        this.props.onToggleExpand();
    }
            
    handleSubmit = event => { // Ditto: fxn sends data (input text value) to parent
        event.preventDefault();
        this.props.onSearch(this.state.searchInput);
        event.currentTarget.reset();
    }

    render() {
        return (
            <div>                
            <form 
                className='search-form'
                onSubmit={this.handleSubmit}> 
                    <input 
                        className='search-input-box' 
                        type='search'                     
                        onChange={this.handleChange}
                        placeholder='Google' />
                    {/* <button>icon</button> */}
                   
            </form>            
            </div>
        );
    }

} // SearchBox Component

export default Googlesearch