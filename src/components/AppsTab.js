import React  from 'react';
import '../styles/AppsTab.css';

    // arrayOfBookmarks.push({
    //   parentId: arrayOfParentFolder[i].i,
    //   title: arrayOfParentFolder[i].title,
    //   children: arrayOfParentFolder[i].children
    // })


// *** get the initial app/extension list ***
const getAllList = [];
const appList = [];
const extensionList = [];
/* eslint-disable */
chrome.management.getAll(function(info) {
  for (var i = 0; i < info.length; i++) {
    getAllList.push(info[i]);
    // TODO isApp is depreciated so maybe change to type
    if (info[i].isApp) {
      appList.push(info[i]);
    }
    // for now do not include our own extension cause can not access icon to display 
    else if (info[i].name == "TurtleTab") {
      continue;
    }
    else{
     extensionList.push(info[i]);
    }
  }
});
/* eslint-enable */

            // <div className="todo-control-group"  onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            //     <label className="todo-control todo-control--checkbox blue">{this.props.text}
            //         <input type="checkbox" checked={checkbox}/>
            //         <div className="todo-control__indicator"></div>
            //     </label>
            // </div>

class AppsTabTrashImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            mouseHover: false,
        };
    }	
    onMouseEnter = () => {
        this.setState({mouseHover: true});
    }
    onMouseLeave = () => {
        this.setState({mouseHover: false});
    }
    render() {
        // check the checkbox when mouse hover over
        var trashIconSize;
        if (this.state.mouseHover) {
            trashIconSize = "26"
        }
        else {
            trashIconSize = "22"
        }

        return (
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <img src={require("./../assets/trashAppsTab.png")}  alt="trash icon" width={trashIconSize} /> 
          </div>
        );
    }
}


class AppsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          getAllList: getAllList,
          appList: appList,
          extensionList: extensionList
        }
      }
      test = (event) => {
        alert("test here");
        alert(this.state.appList[0].icons[0].url)
        alert(this.state.extensionList[1].name)
      }
      clickDeleteIcon = () => {
        alert("Clicked delete icon. Work in progress not finish");
      }


      render() {
        // displays the apps
        var displayApps;
        displayApps = (
          <div>
            {this.state.appList.map( (elm, i) => 
              <div className="flex" >
                <div className="flex2">
                    <img src={elm.icons[0].url} alt="app icon" width="30" /> 
                </div>
                <div className="flex12">
                  <p>{elm.name}</p>
                </div>
                <div className="flex2">
                  <p>*disabled*</p>
                </div>
                <div onClick={this.clickDeleteIcon}className="AppsTabTrashIcon">
                  <AppsTabTrashImg />
                </div>
              </div>
            )} 
          </div>
        );

        // displays the extensions
        var displayExtensions;
        displayExtensions = (
          <div>
            {this.state.extensionList.map( (elm, i) => 
              <div className="flex" >
                <div className="flex2">
                    <img src={elm.icons[0].url} alt="app icon" width="30" /> 
                </div>
                <div className="flex12">
                  <p>{elm.name}</p>
                </div>
                <div className="flex2">
                  <p>*disabled*</p>
                </div>
                <div onClick={this.clickDeleteIcon}className="AppsTabTrashIcon">
                  <AppsTabTrashImg />
                </div>
              </div>
            )} 
          </div>
        );

          return (
            <div>
              {/* HEADER */}
              <div className='Apps-Header'>
                <button className='AppsExitButton' onClick={this.props.closeHandler}>X</button>
                <h2 className='Bookmarks-Title-Text'>Apps</h2>
              </div>
              <div className='Apps-Body'>
              <div class="add-to-body">
                <h2 onClick={this.test}>apps:</h2>

                {displayApps}

                <h2>extensions:</h2>
                {displayExtensions}

              </div>



            </div>
          </div>
        );
      }
}

export default AppsTab;
