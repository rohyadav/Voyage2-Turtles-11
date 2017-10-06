import React, { Component } from 'react';
import './Notes.css';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
               <header className='Notes-Header'><p>Bookmarks</p></header>
            </div> 
        )
    }
}
export default Bookmarks;