import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';
/* eslint-disable */
chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
  console.log(response.farewell);
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting == "hello") {
      return sendResponse({ farewell: "goodbye" });
    }
  });
/* eslint-enable */
export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      searchTerm: '',
      searchArray: [],
      searchButton: '../assets/search.png',
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
  // bookmarksList = () => {
  //   let array = [];
  //   let bookmarkTreeNodes = chrome.bookmarks.getTree(function (child) { 
  //     array.push(child)
  //   });
  // }

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
          <aside id="bookmarkFolders"></aside>
          <div id="bookmarksList"></div>
        </section>
      </div>
    );
  }
}
