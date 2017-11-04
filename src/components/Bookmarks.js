import React, { Component } from 'react';
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
// grabbing data from localStorage to use for everything else
const localStorageBookmarks = JSON.parse(localStorage.getItem("arrayOfBookmarks"));
console.log(localStorageBookmarks);

// grabs parentFolders and packages them as list elements
const FormattedParentFolder = () => {
  let listOfParentFolders = localStorageBookmarks.map((parentFolder, index) =>
    <li onClick={<FormattedChildrenBookmarks parentFolderIndex={index} />} key={index}>{parentFolder.title}</li>
  );
  console.log("mappingParentFolders is " + listOfParentFolders);
  return <ul className="bookmarkParentFolder">{listOfParentFolders}</ul>;
}
const FormattedChildrenBookmarks = (props) => {
  // iterating through parent folders and looking at all the children inside each parentFolder
  const parentFolderIndex = props.parentFolderIndex;
  let listOfChildrenBookmarks;
  if (parentFolderIndex === null || parentFolderIndex === undefined || parentFolderIndex.length !== 1) {
    listOfChildrenBookmarks = localStorageBookmarks[0].children.map((bookmarks, index) =>
      <li key={bookmarks.index}>
        <a href={bookmarks.url}>
          <img href={bookmarks.url + "/favicon.ico"} alt="siteIcon" />
          {bookmarks.title}
        </a>
      </li>
    )
  } else {
    listOfChildrenBookmarks = localStorageBookmarks[parentFolderIndex].children.map((bookmarks, index) =>
      <li key={bookmarks.index}>
        <a href={bookmarks.url}>
          <img href={bookmarks.url + "/favicon.ico"} alt="siteIcon" />
          {bookmarks.title}
        </a>
      </li>
    ) 
  }
  console.log("mappingBookmarks is " + listOfChildrenBookmarks);
  return <ul className="bookmarkList">{listOfChildrenBookmarks}</ul>;
}
export class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
      searchTerm: '',
      searchArray: [],
      searchButton: '../assets/search.png'
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
          <section>
            <FormattedParentFolder />
            <FormattedChildrenBookmarks />
          </section>
        </div> {/* END OF BODY */}
      </div>
    );
  }
}
