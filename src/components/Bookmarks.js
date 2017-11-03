import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';
/* eslint-disable */
let objectOfBookmarks = {};
chrome.bookmarks.getTree(function(tree) {
  console.log(tree[0]);
  let arrayOfParentFolder = tree[0].children;
  for (var i = 0; i < arrayOfParentFolder.length; i++) {
    // iterate through parents, for each, 
    // grab parentid and push into ObjectOfBookmarks with key of "parentId"
    // grab title and push into ObjectOfBookmarks with key of "title"
    // grab children and push the array as "children" in ObjectOfBookmarks
  }
});

let formattedChildrenBookmarks = {};
// for each ObjectOfBookmarks, map each parent so that children are turned into list elements
// push new array of children into its one bundle to be called upon when this.state.bookmarks call upon them to be rendered


/* eslint-enable */
export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      searchTerm: '',
      searchArray: [],
      searchButton: '../assets/search.png',
      bookmarksArray: [];
    }
  }
  setSearchQuery = (event) => {
    this.setState({ searchTerm: event.target.value });
  }
  handleBookmarksSearch = () => {
    this.keepCount();
    const value = this.state.searchTerm;
    const newArray = [...this.state.searchArray];
    newArray[newArray.length] = value;
    this.setState({
      searchArray: newArray
    })
  }
  render() {
    return (
      <div>
        {/* HEADER */}
        <div className='Bookmarks-Header'>
          <button className='bookmarksExitButton' onClick={this.props.closeHandler}>X</button>
          <h1 className='Bookmarks-Title-Text'>Bookmarks</h1>
        </div>
        {/* SEARCH FEATURE */}
        <div className='Bookmarks-Body'>
          <div class="searchBookmarksBackground">
            <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" />
            <a><img className='searchButton' onChange={this.handleBookmarksSearch} src={this.state.searchButton} alt="search"></img></a>
          </div>
        </div>
        {/* BOOKMARKS LIST */}
        <section>
          <div id="bookmarkFolders"></div>
          <div id="bookmarksList"></div>
        </section>
      </div>
    );
  }
}
