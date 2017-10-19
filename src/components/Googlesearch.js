import React, {Component} from 'react';
import '../styles/Googlesearch.css';

class Googlesearch extends Component { // Parent component

    constructor(props) {
        super(props);
        this.state = { 
            selected: this.props.types[0] // types array was passed down as a prop
        };
        this.handleClick = this.handleClick.bind(this); // Lexical scope
    }

    handleClick = (type, event) => {
        event.preventDefault();
        this.setState({
          selected: type // Click event in SearchType invokes this function 
        });
    }

    googleSearch = (query) => {
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

    render() {
        return (
            <div>
                <SearchType 
                    types={this.props.types} 
                    selected={this.state.selected}
                    handleClick={this.handleClick}/> 
                <SearchBox 
                    onSearch={this.googleSearch} />                    
            </div> 
        )
    } 

} //  Googlesearch Component

class SearchType extends React.Component {
    
    render() {

        const types = this.props.types; 

        const spanItems = types.map((type) =>        
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
        this.state = { searchInput: ''};
    }

    onSearchChange = event => {
        this.setState({ searchInput: event.target.value });
    }
            
    handleSubmit = event => {
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
                        onChange={this.onSearchChange}
                        placeholder='Google' />
                    {/* <button>icon</button> */}
            </form>
            </div>
        );
    }

} // SearchBox Component

export default Googlesearch