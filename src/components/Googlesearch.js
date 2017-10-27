import React, {Component} from 'react';
import '../styles/GoogleSearch.css';
import GoogleAutosuggest from './GoogleAutosuggest'

class GoogleSearch extends Component { // Parent component

    constructor(props) {
        super(props);
        this.state = {
            selected: 'Web', // 'selected' property determines URL (Is there a concise way to target first key in object)
            suggestions: ['initialized state'], // API data
            expanded: false
        };
        this.handleClick = this.handleClick.bind(this); // binding is optional bc of arrow fxn's lexical scope
    }

    handleClick = (type, event) => { // Click event in SearchType invokes this fxn. Fxn updates state with selected type
        event.preventDefault();
        this.setState({selected: type});
    }

    googleSearch = (query) => { // Submit event in SearchBox invokes this fxn
        let selected = this.state.selected; // which type is selected
        let collection = this.props.types[0]; // {web: url, images: url, etc}
        let urlType = collection[selected];
        let url = urlType + query
        window.open(url,'_self'); // alternative: _blank
    }

    componentDidMount() { // Crucial, otherwise Wiki data isn't fetched immediately onload
        this.autoSuggest()
    }

    autoSuggest = (autoQuery) => { // Change event in SearchBox invokes this fxn and passes text input value. Fxn updates state with API autosuggestions
        let apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&redirects=return&search=${autoQuery}`; // Resolve No 'Access-Control-Allow-Origin' header error with '&origin=*'
        fetch(apiUrl)
            .then(response => response.json())
            .then(responseData => {
                // console.log('[1] Complete data', responseData); Wiki's undefined/default data (at onload)
                this.setState({ suggestions: responseData[1] });
                // console.log('[1] State updated', this.state.suggestions);
            })
            .catch(error => {
                console.log('Problem fetching data', error);
            })
    }

    toggleExpand = () => {
        this.setState({expanded: true});
        // As of right now this is useless/redundant
        // TO DO: 
        // Set to false when input text value is empty. 
        // add a way to set to false when clicking outside of the autolist        
    }

    handleClickAuto = (currentAuto) => {
        let selected = this.state.selected;
        let collection = this.props.types[0];
        let urlType = collection[selected];
        let url = urlType + currentAuto;
        window.open(url, '_self');
    }

    render() {
        return (
            <div>
                <SearchType
                    types={Object.keys(this.props.types[0])}
                    selected={this.state.selected}
                    handleClick={this.handleClick}/> {/* .bind(this) unnecessary since it's an arrow fxn */}
                <SearchBox
                    onSearch={this.googleSearch}
                    onAutoSuggest={this.autoSuggest}
                    onToggleExpand={this.toggleExpand}/>
                <GoogleAutosuggest
                    onAutoSearch={this.autoSearch}
                    suggestions={this.state.suggestions}
                    expanded={this.state.expanded}
                    handleClickAuto={this.handleClickAuto} />
            </div>
        )
    }

} //  GoogleSearch Component

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
        this.props.onAutoSuggest(event.target.value); // Can't use this.state.searchInput, one step delay, state is async
        this.props.onToggleExpand();
    }

    handleSubmit = event => { // Ditto: fxn sends data (input text value) to parent
        event.preventDefault();
        this.props.onSearch(this.state.searchInput); // State is correct text input value
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
                    <button type='submit'> {/* event handler unnecessary */}
                        <i class="fa fa-search search-icon" aria-hidden="true"></i>
                        <span class="sr-only">search icon</span>
                    </button>

            </form>
            </div>
        );
    }

} // SearchBox Component

export default GoogleSearch
