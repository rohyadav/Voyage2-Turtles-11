import React, {Component} from 'react';
import '../styles/Googlesearch.css';
// import logo from './logo.svg'; (Example of how to import images)

class Googlesearch extends Component {

googleSearch(query) {
    let url=`https://www.google.com/search?q=${query}`
    window.open(url,'_self'); // alternative: _blank
}

// New window Google search results by search type function

    render() {
        return (
            <div>
                <SearchType />
                <SearchBox 
                    onSearch={this.googleSearch} />                    
            </div> 
        )
    } 
} //  Googlesearch Component

class SearchType extends React.Component {

    render() {

        return (
            <div className='search-type'>                
                <span className='type-item'>Web</span>
                <span className='type-item'>Images</span>
                <span className='type-item'>News</span>
                <span className='type-item'>Videos</span>
                <span className='type-item'>Maps</span>
          </div>
        );
    }
} // SearchType Component

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchInput: ''};
    }
    // state = {
    //     searchInput: ''
    //   }
            
      handleSubmit = event => {
        event.preventDefault();
        this.props.onSearch(this.state.searchInput);
        event.currentTarget.reset();
      }

    render() {
        return (
            <div>                
            <form className='search-form'
                  onSubmit={this.handleSubmit}> 
                <input className='search-input-box' 
                        type='search'                     
                        onChange={this.onSearchChange}
                        placeholder='Google' />
                {/* <button>icon</button> */}
            </form>
            </div>
        );

    }

    onSearchChange = event => {
        this.setState({ searchInput: event.target.value });
    }

} // SearchBox Component

export default Googlesearch;