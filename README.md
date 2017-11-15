![Image alt text](https://i.imgur.com/FSoEtO5.png "Main Page")

## Table of Contents
* [Introduction](https://github.com/chingu-coders/Voyage2-Turtles-11#introduction)
* [Features](https://github.com/chingu-coders/Voyage2-Turtles-11#features)
* [Contributors](https://github.com/chingu-coders/Voyage2-Turtles-11#contributors)
* [Build Process](https://github.com/chingu-coders/Voyage2-Turtles-11#build-process)
* [Deployment to Chrome](https://github.com/chingu-coders/Voyage2-Turtles-11#deployment-to-chrome)
* [Versions](https://github.com/chingu-coders/Voyage2-Turtles-11#versions)

## Introduction
TurtleTab is a Google Chrome Extension Built with React. It creates a new homepage which features current Weather, Todo and Notes functionality. It also accesses your browser data to see Bookmarks, enable/disable Apps and Extensions, and see/clear your History. It is a collaborative effort by a remote team of aspiring developers who met on Chingu, an international community of coders.

## Features
A few of the things you can do with this Google Chrome Extension:
* Google Search from the Home Page
* See your current weather and search for other locations
* Keep reminders for yourself with the Notes and Todo features
* See your bookmarks and quickly open new links
* Enable / Disable Chrome Apps and Extensions
* See and Clear your browser history
* Cycle through backgrounds with the click of the Turtle Icon (bottom-right)

![Image alt text](https://i.imgur.com/HOR4gE8.png "Search")
![Image alt text](https://i.imgur.com/Dypb5nh.png "User Utility Features")
![Image alt text](https://i.imgur.com/cTSXV15.png "Chrome Tools")

## Contributors
* [Francesca Sadikin (PM and Designer)](https://github.com/serpient)
* [Thorbw](https://github.com/thorbw)
* [Eun Park](https://github.com/eunipa)
* [Miles Burke](https://github.com/milesj76)
## Build Process
* This project is built with [Create React App](https://github.com/facebookincubator/create-react-app). Please take a look at their guide for installation. As a side note, the Notes Tab is built with React and Redux
* Clone or download the repo
* Once in the directory of the repo, run ```npm install``` 
* As this is a google chrome extension which pulls data from the ChromeAPI, ```npm start``` will throw errors as it cannot connect with ChromeAPIs. You must build the project and upload the build folder into Chrome as an extension for it to run. Run ```npm run build``` to build the Build Folder. See Deployment to Chrome for further instructions.

## Deployment to Chrome
* Open up Google Chrome and navigate to chrome://extensions
* In the top right-hand corner, check the "Developer Mode" box
* Click "Load unpacked extension..." and point the directory to the ```build``` folder generated from ```npm run build```
* Open a new tab to start testing

## Versions
* Version 1.0.0: 

   * Re-sized wallpaper resolution for faster load/reload  
   * All tabs have search features which is activated when pressing "Enter"  
   * Current wallpaper choice will be remembered on reload  
   * Clock is re-rendered whenever it changes  
   * Weather Tab: Search will output error message when a searched location is not found  
   * Notes Tab: Existing notes will be remember any changes the user makes - Added an update button; Visibility Filters is highlighted when active.; Added icons to each filter for better user understanding  
   * Todo Tab: Quantity counter is accurate; Search feature has been added  
   * History Tab: Search results is cleared when clicking the "clear" button  


* Version 0.0.1: Initial deployment