import React, {Component} from 'react';
import '../styles/Googlesearch.css';
// import logo from './logo.svg'; (Example of how to import images)

class Googlesearch extends Component {


googleSearch(query) {
    let url=`https://www.google.com/search?q=${query}`
    window.open(url,'_self'); // alternative: _blank
}

    render() {

        const types = ['Web', 'Images', 'News', 'Videos', 'Maps'] // 'TYPES' ARRAY GETS PASSED DOWN AS A PROP

        return (
            <div>
                <SearchType types={types} selected={types[0]}/> 
                <SearchBox 
                    onSearch={this.googleSearch} />                    
            </div> 
        )
    } 
} //  Googlesearch Component

class SearchType extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            // active: false // STYLES OBJECT METHOD
            selected: this.props.selected
        };
        this.handleClick = this.handleClick.bind(this);
    }

    // STYLES OBJECT METHOD: 
    // Works, but all items get selected. This is bc event.target.key always == type. Therefore,state.active will always be true. Since all spans' styles are dependent on the state being active, if the state is active, then all the spans become styled. Need to do something that targets only one span.

    // handleClick = (event, type) => {      
    //     if (type == event.target.key) {
    //         this.setState({ active: true})
    //     } else this.setState( {active: false})
    // }

    handleClick(type, event) {
        event.preventDefault();
        this.setState({
          selected: type
        });
      }
    
    render() {

        // STYLES OBJECT METHOD
        // const styles = {
        //     active: {
        //         borderBottom: '2px solid #2ECC71',
        //     },
        //     inactive: {
        //         borderBottom: ''
        //     }
        // }
        
        // const stateStyle = this.state.active ? styles.active : styles.inactive;

        const types = this.props.types; 
        // let activeClass = (this.state.selected === type ? 'is-active' : '');

        const spanItems = types.map((type) =>        
            <span key={type} className={this.state.selected === type ? 'is-active' : ''} onClick={this.handleClick.bind(this, type)}>{type}</span>
            // style={stateStyle} STYLES OBJECT METHOD
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
            
      handleSubmit = event => {
        event.preventDefault();
        this.props.onSearch(this.state.searchInput);
        event.currentTarget.reset();
      }

      onSearchChange = event => {
        this.setState({ searchInput: event.target.value });
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

} // SearchBox Component

export default Googlesearch