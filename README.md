![Image alt text](https://i.imgur.com/8ZEF5ki.jpg "Main Page")

## Table of Contents
* Introduction
* Features
* Contributors
* Build Process
## Introduction
TurtleTab is a Google Chrome Extension Built with React. It creates a new homepage which features current weather, todo and notes functionality. It also accesses your browser data to see bookmarks, enable/disable apps and extensions, and see/clear your history . It is a collaborative effort by a remote team of aspiring developers who met on Chingu, an international community of coders.

## Features
A few of the things you can do with this Google Chrome Extension:
* Google Search from the Home Page
* See your current weather and search for other locations
* Keep reminders for yourself with the Notes and Todo features
* See your bookmarks and quickly open new links
* Enable / Disable Chrome Apps and Extensions
* See and Clear your browser history

![Image alt text](https://i.imgur.com/yW8m4Gc.jpg "Search")
![Image alt text](https://imgur.com/1pHr5Bx "User Utility Features")
![Image alt text](https://i.imgur.com/lHR8CB2.jpg "Chrome Tools")

## Contributors
* [Francesca Sadikin (PM and Designer)](https://github.com/serpient)
* [Thorbw](https://github.com/thorbw)
* [Eun Park](https://github.com/eunipa)
* [Miles Burke](https://github.com/milesj76)
## Build Process
* This project is build with [Create React App](https://github.com/facebookincubator/create-react-app) to build this project. Please take a look at their guide for installation
* Clone or download the repo
* Once in the directory of the repo, run ```npm install``` 
* As this is a google chrome extension which pulls data from the ChromeAPI, ```npm start``` will throw errors as it cannot connect with ChromeAPIs. You must build the project and upload the build folder into Chrome as an extension for it to run. Run ```npm run build``` to build the Build Folder, enable developer mode within chrome://extensions and then click "Load unpacked extension.."
* Other features are built with only React
* Notes Tab and related features are built with React and Redux