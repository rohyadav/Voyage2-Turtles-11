import React from 'react';
import '../styles/AppsTab.css';



// *** get the initial app/extension list ***
const appList = [];
const searchList = [];
const appListDisableEnable = [];
const extensionList = [];
const extensionListDisableEnable = [];

/* eslint-disable */
chrome.management.getAll(function (info) {
  for (var i = 0; i < info.length; i++) {
    // TODO isApp is depreciated so maybe change to type
    if (info[i].isApp) {
      appList.push(info[i]);
      appListDisableEnable.push(info[i].enabled);
      searchList.push(info[i]);
    }
    else {
      extensionList.push(info[i]);
      extensionListDisableEnable.push(info[i].enabled);
      searchList.push(info[i]);
    }
  }
});
/* eslint-enable */

class NameAppsExt extends React.Component {
  render() {
    var typeText;
    if (this.props.enable) {
      typeText = "";
    }
    else {
      typeText = "AppsTabLineThrough";
    }

    return (
      <div >
        <p className={typeText}>{this.props.textAppsExt}</p>
      </div>
    );
  }
}

class Icons extends React.Component {
  render() {
    var isEnabled = "AppsTabOpacity";
    if (this.props.isEnabled) {
      isEnabled = "";
    }

    var icon;
    if (typeof this.props.linkIcon == "undefined") {
      icon = (
        <div>
          <img src={require('../assets/appstab-broken-icon.svg')} alt="app icon" width="23" />
        </div>
      )
    }
    else {
      icon = (
        <div className={isEnabled}>
          <img src={this.props.linkIcon[0].url} alt="app icon" width="23" />
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
    this.setState({ mouseHover: true });
  }
  onMouseLeave = () => {
    this.setState({ mouseHover: false });
  }
  render() {
    // check the checkbox when mouse hover over
    var trashIconSize;
    if (this.state.mouseHover) {
      trashIconSize = "20"
    }
    else {
      trashIconSize = "15"
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
    this.setState({ mouseHover: true });
  }
  onMouseLeave = () => {
    this.setState({ mouseHover: false });
  }
  render() {
    // check the checkbox when mouse hover over
    var trashIconSize;
    if (this.state.mouseHover) {
      trashIconSize = "20"
    }
    else {
      trashIconSize = "18"
    }

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <img src={require("./../assets/trashAppsTab.png")} alt="trash icon" width={trashIconSize} />
      </div>
    );
  }
}



class AppsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: appList,
      searchList: searchList,
      appListDisableEnable: appListDisableEnable,
      extensionList: extensionList,
      extensionListDisableEnable: extensionListDisableEnable
    }
  }

  update = () => {
    let callme = this;
    /* eslint-disable */
    chrome.management.getAll(function (info) {
      let appListUpdate = [];
      let searchListUpdate = [];
      let appListDisableEnableUpdate = [];
      let extensionListUpdate = [];
      let extensionListDisableEnableUpdate = [];
      for (var i = 0; i < info.length; i++) {
        // TODO isApp is depreciated so maybe change to type
        if (info[i].isApp) {
          appListUpdate.push(info[i]);
          appListDisableEnableUpdate.push(info[i].enabled);
          searchList.push(info[i]);
        }
        else {
          extensionListUpdate.push(info[i]);
          extensionListDisableEnableUpdate.push(info[i].enabled);
          searchList.push(info[i].enabled);
        }
      }
      callme.setState({ appList: appListUpdate });
      callme.setState({ appListDisableEnable: appListDisableEnableUpdate });
      callme.setState({ extensionList: extensionListUpdate });
      callme.setState({ extensionListDisableEnable: extensionListDisableEnableUpdate });
      callme.setState({ searchList: searchListUpdate });
    });
    /* eslint-enable */
  }

    handleChange = (event) => {
      let appListUpdate = [];
      let appListDisableEnableUpdate = [];
      let extensionListUpdate = [];
      let extensionListDisableEnableUpdate = [];

       let appListFiltered = this.state.searchList.filter(function(obj) {
            return obj.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
      for (var i = 0; i < appListFiltered.length; i++) {
        if (appListFiltered[i].isApp) {
          appListUpdate.push(appListFiltered[i]);
          appListDisableEnableUpdate.push(appListFiltered[i].enabled);
        }
        else {
          extensionListUpdate.push(appListFiltered[i]);
          extensionListDisableEnableUpdate.push(appListFiltered[i].enabled);
        }
      }
      this.setState({ appList: appListUpdate });
      this.setState({ appListDisableEnable: appListDisableEnableUpdate });
      this.setState({ extensionList: extensionListUpdate });
      this.setState({ extensionListDisableEnable: extensionListDisableEnableUpdate });
    }

  handleSubmit = (event) => {
    // remove focus from input bar.
   document.getElementById("AppsTab-input").blur();
    event.preventDefault();
  }

  clickDeleteIcon = (elm, i, event) => {
    /* eslint-disable */
    let callme = this;
    chrome.management.uninstall(elm.id, function () {
      callme.update();
    });
    /* eslint-enable */
    event.preventDefault();
  }
  clickEnableDisableApp = (elm, i, event) => {
    var arr = this.state.appListDisableEnable.slice();
    arr[i] = !arr[i];
    this.setState({ appListDisableEnable: arr });
    /* eslint-disable */
    chrome.management.setEnabled(elm.id, arr[i]);
    /* eslint-enable */
    event.preventDefault();

  }
  clickEnableDisableExt = (elm, i, event) => {
    var arr = this.state.extensionListDisableEnable.slice();
    arr[i] = !arr[i];
    this.setState({ extensionListDisableEnable: arr });
    /* eslint-disable */
    chrome.management.setEnabled(elm.id, arr[i]);
    /* eslint-enable */
    event.preventDefault();
  }

  render() {

    // displays the apps
    var displayApps;
    if (this.state.appList.length) {
        displayApps = (
          <div className="AppsTabBackground">
            {this.state.appList.map((elm, i) =>
              <div className="AppsTabflex" >
                <div className="AppsTabAppsAndExtensionIcon">
                  <Icons linkIcon={elm.icons} isEnabled={this.state.appListDisableEnable[i]} />
                </div>
                <div className="AppsTabNames">
                  <div className="AppsTabDescription">
                    <NameAppsExt textAppsExt={elm.name} enable={this.state.appListDisableEnable[i]} />
                  </div>
                </div>
                <div className="AppsTabEnable" onClick={this.clickEnableDisableApp.bind(this, elm, i)}>
                  <AppsTabEnableDisableButton enable={this.state.appListDisableEnable[i]} />
                </div>
                <div onClick={this.clickDeleteIcon.bind(this, elm, i)} className="AppsTabTrashIcon">
                  <AppsTabTrashImg />
                </div>
              </div>
            )}
          </div>
        )
    } else {
        displayApps = (
          <div className="AppsTabBackground AppsTabDescription">
            <p>No apps found</p> 
          </div>
        )
    }

    // displays the extensions
    var displayExtensions;
    if (this.state.extensionList.length) {
        displayExtensions = (
          <div className="AppsTabBackground">
            {this.state.extensionList.map((elm, i) =>
            <div className="AppsTabflex" >
              <div className="AppsTabAppsAndExtensionIcon">
                <Icons linkIcon={elm.icons} isEnabled={this.state.extensionListDisableEnable[i]} />
              </div>
              <div className="AppsTabNames">
                <div className="AppsTabDescription">
                  <NameAppsExt textAppsExt={elm.name} enable={this.state.extensionListDisableEnable[i]} />
                </div>
              </div>
              <div className="AppsTabEnable" onClick={this.clickEnableDisableExt.bind(this, elm, i)}>
                <AppsTabEnableDisableButton enable={this.state.extensionListDisableEnable[i]} />
              </div>
              <div onClick={this.clickDeleteIcon.bind(this, elm, i)} className="AppsTabTrashIcon">
                <AppsTabTrashImg />
              </div>
            </div>
          )}
        </div>
        )
    } else {
        displayExtensions = (
          <div className="AppsTabBackground AppsTabDescription">
            <p>No extensions found</p> 
          </div>
        )
    }

    return (
      <div>
        {/* HEADER */}
        <div className='Apps-Header'>
          <button className='AppsExitButton' onClick={this.props.closeHandler}>X</button>
          <h2 className='AppsTab-Title-Text'>Apps</h2>
        </div>
        <div className='Apps-Body'>
          <form className="AppsTab-Search-Background" onSubmit={this.handleSubmit}>
            <input id="AppsTab-input" className="AppsTab-input-box AppsTab-inputBoxText" type="search" placeholder="Search Apps" 
              value={this.state.value} onChange={this.handleChange} />
          </form>
          <div class="AppsTab-add-to-body">
            <h2 className="AppsTabSubText">apps:</h2>
              {displayApps}

            <h2 className="AppsTabSubText ">extensions:</h2>
              {displayExtensions}
          </div>



        </div>
      </div>
    );
  }
}

export default AppsTab;
