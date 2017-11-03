import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/Bookmarks.css';
/* eslint-disable */
let arrayOfBookmarks = [];
chrome.bookmarks.getTree(function (tree) {
  // console.log(tree[0]);
  let arrayOfParentFolder = tree[0].children;
  for (var i = 0; i < arrayOfParentFolder.length; i++) {
    arrayOfBookmarks.push({
      parentId: arrayOfParentFolder[i].parentId,
      title: arrayOfParentFolder[i].title,
      children: arrayOfParentFolder[i].children
    });
  }
  localStorage.setItem("arrayOfBookmarks", JSON.stringify(arrayOfBookmarks));
});
/* eslint-enable */
console.log(arrayOfBookmarks);
const localStorageBookmarks = JSON.parse(localStorage.getItem("arrayOfBookmarks"));
console.log(localStorageBookmarks);

// onClick={this.onFolderClick(index)}
const FormattedParentFolder = () => {
  let listOfParentFolders = localStorageBookmarks.map((parentFolder, index) =>
    <li key={index}>{parentFolder.title}</li>
  );
  console.log("mappingFolders is " + listOfParentFolders);
  return <ul className="bookmarkParentFolder">{listOfParentFolders}</ul>;
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
    this.setState({
      searchArray: newArray
    })
  }

  // formattedChildrenBookmarks = () => {
  //   // for each ObjectOfBookmarks, map each parent so that children are turned into list elements
  //   // push new array of children into its one bundle to be called upon when this.state.bookmarks call upon them to be rendered
  //   for (var i = 0; i < localStorage.arrayOfBookmarks.length) {
  //     localStorage.arrayOfBookmarks[i].children.map(function(bookmarks, index) {
  //       <li key={bookmarks.index}><a href={bookmarks.url}>{bookmarks.title}</a></li>
  //     })
  //   }
  // }

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
            <div id="bookmarksList"></div>
          </section>
        </div>
      </div>
    );
  }
}
