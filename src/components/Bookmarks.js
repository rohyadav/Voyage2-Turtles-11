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
    <a key={index} onClick={() => FormattedChildrenBookmarks(index)}>
        {parentFolder.title}
    </a>  
  );

  return <aside className="bookmarkParentFolder">{listOfParentFolders}</aside>;
}
function FormattedChildrenBookmarks(index = 0) {
  // iterating through parent folders and looking at all the children inside each parentFolder
  let parentFolderIndex = index;
  if (localStorageBookmarks[parentFolderIndex] === undefined || localStorageBookmarks[parentFolderIndex] === null ) {
    parentFolderIndex = 0;
  }
  console.log("parentFolderIndex is " + parentFolderIndex);
  let maplistOfChildrenBookmarks = localStorageBookmarks[parentFolderIndex].children
  console.log("maplistOfChildrenBookmarks is " + maplistOfChildrenBookmarks);
  let listOfChildrenBookmarks;

  listOfChildrenBookmarks = maplistOfChildrenBookmarks.map((bookmarks, index) =>
    <li key={bookmarks.index} style={{ listStyleImage: "url(chrome://favicon/" + bookmarks.url + ")" }}>
      <a href={bookmarks.url}>
        {bookmarks.title}
      </a>
    </li >
  )
  console.log("listOfChildrenBookmarks is " + listOfChildrenBookmarks);
  return <div className="bookmarkList"><ul>{listOfChildrenBookmarks}</ul></div>;
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
          <section className="BookmarksListBody">
            <FormattedParentFolder />
            <FormattedChildrenBookmarks />
          </section>
        </div> {/* END OF BODY */}
      </div>
    );
  }
}
