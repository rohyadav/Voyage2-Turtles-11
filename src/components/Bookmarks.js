import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';
import { Col, Grid } from 'react-bootstrap';


let bookmarksList = [];
/* eslint-disable */
// calling google chrome API , pushing data to arrayOfBookmarks variable
chrome.bookmarks.getTree(function (tree) {
  let arrayOfParentFolder = tree[0].children;
  //console.log("arrayOfParentFolder is " + JSON.stringify(arrayOfParentFolder));
  for (var i = 0; i < arrayOfParentFolder.length; i++) {
    if (Array.isArray(arrayOfParentFolder[i].children)) {
      var childrenLink = arrayOfParentFolder[i].children;
      for (var j = 0; i < childrenLink.length; j++) {
        bookmarksList.push({
          parentId: childrenLink[j].parentId,
          title: childrenLink[j].title,
          children: childrenLink[j].children,
          index: childrenLink[j].index,
          url: childrenLink[j].url,
        });
      }
    } else {
      bookmarksList.push({
        parentId: arrayOfParentFolder[i].parentId,
        title: arrayOfParentFolder[i].title,
        children: arrayOfParentFolder[i].children,
        index: arrayOfParentFolder[i].index,
        url: arrayOfParentFolder[i].url,
      });
    }
  }
});
/* eslint-enable */

export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      parentFolderIdx: 0,
      bookmarks: bookmarksList,
      searchArray: [],
      highlighted: {
        backgroundColor: "rgba(255, 238, 0, 0.514)",
        border: "1px solid $bookmarks-yellow"
      },
    }
  }

  shortenBookmarkTitles = (title, number) => {
    let newTitle = title;
    if (title.length >= number) {
      newTitle = title.slice(0, number) + "...";
    }
    return newTitle
  }

  openLinkInNewTab = (url) => {
    /* eslint-disable */
    chrome.tabs.create({
      url: url,
      active: false
    });
    /* eslint-enable */
  }

  bookmarksFormatter = (bookmarks) => {
    let newFormattedBookmarks = bookmarks.map((bookmarks, index) =>
      <li className="bookmarks" key={bookmarks.index} style={{ listStyleImage: "url(chrome://favicon/" + bookmarks.url + ")" }}>
        <a href={bookmarks.url} target='_blank'>
          {this.shortenBookmarkTitles(bookmarks.title, 23)}
        </a>
      </li >
    )
    return newFormattedBookmarks;
  }

  IsSubstring(haystack, needle) {
    // haystack: "abcdeffge"
    // needle: "fge"

    let haystackLowerCase = haystack.toLowerCase();
    let needleLowerCase = needle.toLowerCase();

    // i == 5 when f matches
    // starting at 5, need to search 3 characters to verify if there is a match with needle.
    for (var i = 0; i < haystack.length; i++) {
      if (haystackLowerCase[i] === needleLowerCase[0]) {
        // Verify if needle matches in haystack.
        let matched = true;
        for (var j = 1; j < needle.length; j++) {
          if ((i + j) >= haystack.length || haystackLowerCase[i + j] !== needleLowerCase[j]) {
            matched = false;
            break;
          }
        }

        if (matched) {
          return true;
        }
      }
    }

    return false;
  }

  handleBookmarksSearch = (event) => {
    let searchTextInputBox = document.getElementById("searchTextInput");
    let searchQuery = searchTextInputBox.value;
    if (event.key === 'Enter') {
      if (this.state.searchArray.length === 0) {
        // Gather search results
        let searchResults = [];
        for (var parentFolderIdx = 0; parentFolderIdx < this.state.bookmarks.length; parentFolderIdx++) {
          for (var bookmarkIdx = 0; bookmarkIdx < this.state.bookmarks[parentFolderIdx].children.length; bookmarkIdx++) {
            if (this.IsSubstring(this.state.bookmarks[parentFolderIdx].children[bookmarkIdx].title, searchQuery)) {
              searchResults.push(this.state.bookmarks[parentFolderIdx].children[bookmarkIdx]);
            }
          }
        }
        if (searchResults.length) {
          this.setState({
            searchArray: searchResults
          })
        } else if (searchResults.length === 0) {
          this.setState({ searchArray: "No results found" });
        }
      }
    }
  }

  clearBookmarksSearch = (event) => {
    let searchTextInputBox = document.getElementById("searchTextInput");
    let searchQuery = searchTextInputBox.value;
    if (searchQuery.length !== 0) {
      //console.log("in clearBookmarksSearch")
      this.setState({
        searchArray: []
      });
    }
  }

  FormattedChildrenBookmarks = (index) => {
    // iterating through parent folders and looking at all the children inside each parentFolder
    let parentFolderIndex = index;
    if (this.state.bookmarks[parentFolderIndex] === undefined || this.state.bookmarks[parentFolderIndex] === null) {
      parentFolderIndex = 0;
    }
    //console.log("parentFolderIndex is " + parentFolderIndex);
    let maplistOfChildrenBookmarks = this.state.bookmarks[parentFolderIndex].children
    let listOfChildrenBookmarks = this.bookmarksFormatter(maplistOfChildrenBookmarks);
    let result = (<ul className="bookmarkList">{listOfChildrenBookmarks}</ul>)
    return result;
  }

  FormattedParentFolder = () => {
    var filteredParentFoldersByIndex = this.state.bookmarks.filter(function(element) {
      if (Array.isArray(element.children)) {
        return true;
      }
    })
    let listOfParentFolders = filteredParentFoldersByIndex.map((parentFolder, index) => {
      if (index === this.state.parentFolderIdx && this.state.searchArray.length === 0) {
        return (
          <div>
            <a className="bookmarkParentFolder" id={index} style={this.state.highlighted} onClick={() => this.setState({ parentFolderIdx: index })}>
              {parentFolder.title}
            </a>
            <br />
          </div>
        )
      }
      else {
        return (
          <div>
            <a className="bookmarkParentFolder" id={index} onClick={() => this.setState({ parentFolderIdx: index })}>
              {parentFolder.title}
            </a>
            <br />
          </div>
        )
      }
    });
    let searchFolder = (null);
    if (this.state.searchArray.length) {
      searchFolder = (<div><a id="searchFolder" className="bookmarkParentFolder" style={this.state.highlighted}>Search Results</a><br /></div>);
    }
    return <div className="listOfBookmarkFolders">{searchFolder}{listOfParentFolders}</div>;
  }

  render() {
    if (this.state.bookmarks.length === 0) {
      return null;
    }

    let formattedChildrenBookmarks = (null);
    if (this.state.searchArray.length && Array.isArray(this.state.searchArray)) {
      let formatted = this.bookmarksFormatter(this.state.searchArray)
      formattedChildrenBookmarks = <ul className="bookmarkList">{formatted}</ul>;
    } else if (this.state.searchArray === "No results found") {
      formattedChildrenBookmarks = <div className="errorMessage">{this.state.searchArray}</div>
    } else {
      formattedChildrenBookmarks = this.FormattedChildrenBookmarks(this.state.parentFolderIdx);
    }

    let formattedParentBookmarks = this.FormattedParentFolder();
    return (
      <div>
        {/* HEADER */}
        <div className='Bookmarks-Header'>
          <button className='bookmarksExitButton' onClick={this.props.closeHandler}>X</button>
          <h1 className='Bookmarks-Title-Text'>Bookmarks</h1>
        </div>
        {/* BODY */}
        <div className='Bookmarks-Body'>
          {/* SEARCH FEATURE */}
          <div class="searchBookmarksBackground">
            {/* <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" /> */}
            <input id="searchTextInput" type="search" onKeyDown={this.handleBookmarksSearch} onClick={this.clearBookmarksSearch} placeholder="Search Bookmarks" className='SearchBox SearchBoxText' />
            {/* <a><img className='searchBookmarksButton' onClick={this.handleBookmarksSearch} src={this.state.searchButton} alt="search"></img></a> */}
          </div>
          {/* BOOKMARKS LIST */}
          <section className="BookmarksListBody container-fluid">
            <Grid >
              <Col xs={4}>
                {formattedParentBookmarks}
              </Col>
              <Col xs={8}>
                {formattedChildrenBookmarks}
              </Col>
            </Grid>
          </section>
        </div> {/* END OF BODY */}
      </div>
    );
  }
}
