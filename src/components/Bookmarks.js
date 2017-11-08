import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';
/* eslint-disable */
let arrayOfBookmarks = [];
// calling google chrome API , pushing data to arrayOfBookmarks variable
chrome.bookmarks.getTree(function (tree) {
  let arrayOfParentFolder = tree[0].children;
  for (var i = 0; i < arrayOfParentFolder.length; i++) {
    arrayOfBookmarks.push({
      parentId: arrayOfParentFolder[i].parentId,
      title: arrayOfParentFolder[i].title,
      children: arrayOfParentFolder[i].children
    });
  }
  // pushing data from google chrome into localStorage
  localStorage.setItem("arrayOfBookmarks", JSON.stringify(arrayOfBookmarks));
});
/* eslint-enable */
// grabbing data from localStorage to use for the rest of the Bookmarks component
const localStorageBookmarks = JSON.parse(localStorage.getItem("arrayOfBookmarks"));
console.log(localStorageBookmarks);

export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      searchTerm: '',
      searchArray: [],
      searchButton: '../assets/search.png',
      FormattedParentFolder: this.FormattedParentFolder(),
      FormattedChildrenBookmarks: this.FormattedChildrenBookmarks(0)
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
    this.setState({ searchArray: newArray })
  }
  shortenBookmarkTitles = (title, number) => {
    let newTitle = title;
    if (title.length >= number) {
      newTitle = title.slice(0, number) + "...";
    }
    return newTitle
  }
  FormattedParentFolder = () => {
    let listOfParentFolders = localStorageBookmarks.map((parentFolder, index) =>
      <div>
        <a className="bookmarkParentFolder" key={index} onClick={() => this.FormattedChildrenBookmarks(index)}>
          {parentFolder.title}
        </a>
        <br />
      </div>
    );
    return <div className="listOfBookmarkFolders">{listOfParentFolders}</div>;
  }

  FormattedChildrenBookmarks = (index = 0) => {
    // iterating through parent folders and looking at all the children inside each parentFolder
    let parentFolderIndex = index;
    if (localStorageBookmarks[parentFolderIndex] === undefined || localStorageBookmarks[parentFolderIndex] === null) {
      parentFolderIndex = 0;
    }
    console.log("parentFolderIndex is " + parentFolderIndex);
    let maplistOfChildrenBookmarks = localStorageBookmarks[parentFolderIndex].children
    let listOfChildrenBookmarks = maplistOfChildrenBookmarks.map((bookmarks, index) =>
      <li className="bookmarks" key={bookmarks.index} style={{ listStyleImage: "url(chrome://favicon/" + bookmarks.url + ")" }}>
        <a href={bookmarks.url}>
          {this.shortenBookmarkTitles(bookmarks.title, 23)}
        </a>
      </li >
    )
    console.log("listOfChildrenBookmarks is " + listOfChildrenBookmarks);
    let result = (<ul className="bookmarkList">{listOfChildrenBookmarks}</ul>)
    this.setState({ FormattedChildrenBookmarks: result });
  }
  render() {
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
            <textarea onChange={this.setSearchQuery} className='SearchBox SearchBoxText' required placeholder="Search Something" />
            <a><img className='searchButton' onChange={this.handleBookmarksSearch} src={this.state.searchButton} alt="search"></img></a>
          </div>
          {/* BOOKMARKS LIST */}
          <section className="BookmarksListBody">
            {this.state.FormattedParentFolder}
            {this.state.FormattedChildrenBookmarks}
          </section>
        </div> {/* END OF BODY */}
      </div>
    );
  }
}
