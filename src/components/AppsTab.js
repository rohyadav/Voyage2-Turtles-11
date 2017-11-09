import React  from 'react';
import '../styles/AppsTab.css';



// *** get the initial app/extension list ***
const appList = [];
const appListDisableEnable = [];
const extensionList = [];
const extensionListDisableEnable = [];

/* eslint-disable */
chrome.management.getAll(function(info) {
  for (var i = 0; i < info.length; i++) {
    // TODO isApp is depreciated so maybe change to type
    if (info[i].isApp) {
      appList.push(info[i]);
      appListDisableEnable.push(info[i].enabled);
    }
   else{
      extensionList.push(info[i]);
      extensionListDisableEnable.push(info[i].enabled);
    }
  }
});
/* eslint-enable */


class Icons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }	
    render() {
    var icon;
    if (typeof this.props.linkIcon == "undefined")  {
        icon = (
            <div>
                <img src={require('../assets/appstab-broken-icon.svg')} alt="app icon" width="30" /> 
            </div>
        )
    }
    else {
        icon = (
            <div>
                <img src={this.props.linkIcon[0].url} alt="app icon" width="30" /> 
            </div>
        )
    }

        return (
          <div >
            {icon}
          </div>
        );
    }
}

class AppsTabEnableDisableButton extends React.Component {
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

        var text;
        var colorEnabled;
        if (this.props.enable) {
          text = "Disable";
          colorEnabled = "AppsTabButtonEnabled";

        }
        else {
          text = "Enable";
          colorEnabled = "AppsTabButtonDisabled";
        }

        return (
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <p className={colorEnabled}>{text}</p>
          </div>
        );
    }
}


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
          appList: appList,
          appListDisableEnable: appListDisableEnable,
          extensionList: extensionList,
          extensionListDisableEnable: extensionListDisableEnable
        }
      }

      // TODO there is a bug here cause if I choose not to remove the extension well then the 
      // app/ext will be removed from the list anyway.
      // I am not sure how to solve this now cause I do not get any information from the chrome API.
      // well it should be possible using a promise but it just does not work inside react componenent.
      
      clickDeleteIconApps = (elm, i, event) => {
        /* eslint-disable */
        chrome.management.uninstall(elm.id);
        /* eslint-enable */

        // remove the Apps element at index i
        var arr = this.state.appList.slice();
        arr.splice(i, 1);
        this.setState({appList: arr });
        // have to do the same for the disable list
        arr = this.state.appListDisableEnable.slice();
        arr.splice(i, 1);
        this.setState({appListDisableEnable: arr });
        event.preventDefault();
      }
      clickDeleteIconExt = (elm, i, event) => {
        /* eslint-disable */
        chrome.management.uninstall(elm.id);
        /* eslint-enable */

        // remove the Ext element at index i
        var arr = this.state.extensionList.slice();
        arr.splice(i, 1);
        this.setState({extensionList: arr });
        // have to do the same for the disable list
        arr = this.state.extensionListDisableEnable.slice();
        arr.splice(i, 1);
        this.setState({extensionListDisableEnable: arr });
        event.preventDefault();
      }
      clickEnableDisableApp = (elm, i, event) => {
        var arr = this.state.appListDisableEnable.slice();
        arr[i] = !arr[i];
        this.setState({appListDisableEnable: arr});
        /* eslint-disable */
        chrome.management.setEnabled(elm.id, arr[i]);
        /* eslint-enable */
        event.preventDefault();

      }
      clickEnableDisableExt = (elm, i, event) => {
        var arr = this.state.extensionListDisableEnable.slice();
        arr[i] = !arr[i];
        this.setState({extensionListDisableEnable: arr});
        /* eslint-disable */
        chrome.management.setEnabled(elm.id, arr[i]);
        /* eslint-enable */
        event.preventDefault();
      }

  render() {
 


        // displays the apps
        var displayApps;
        displayApps = (
          <div>
            {this.state.appList.map( (elm, i) => 
              <div className="AppsTabflex" >
                <div className="AppsTabAppsAndExtensionIcon">
                  <Icons linkIcon={elm.icons} />
                </div>
                <div className="AppsTabNames">
                <p>{elm.name}</p>
                </div>
                <div className="AppsTabEnable" onClick={this.clickEnableDisableApp.bind(this, elm, i)}>
                  <AppsTabEnableDisableButton enable={this.state.appListDisableEnable[i]}/>
                </div>
                <div onClick={this.clickDeleteIconApps.bind(this, elm, i)}className="AppsTabTrashIcon">
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
              <div className="AppsTabflex" >
                <div className="AppsTabAppsAndExtensionIcon">
                  <Icons linkIcon={elm.icons} />
                </div>
                <div className="AppsTabNames">
                  <p>{elm.name}</p>
                </div>
                <div className="AppsTabEnable" onClick={this.clickEnableDisableExt.bind(this, elm, i)}>
                  <AppsTabEnableDisableButton enable={this.state.extensionListDisableEnable[i]}/>
                </div>
                <div onClick={this.clickDeleteIconExt.bind(this, elm, i)}className="AppsTabTrashIcon">
                  <AppsTabTrashImg />
                </div>
              </div>
            )} 
          </div>
        );


    return (
            <div>
              <div className='Apps-Header'>
                <button className='AppsExitButton' onClick={this.props.closeHandler}>X</button>
                <h2 className='AppsTab-Title-Text'>Apps</h2>
              </div>
              <div className='Apps-Body'>
              <div class="AppsTab-add-to-body">
                <h2>apps:</h2>
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
