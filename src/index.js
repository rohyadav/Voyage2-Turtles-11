import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import App from './App';
import Notes from './Notes';
import Bookmarks from './Bookmarks';
import RenderToHtml from './Notes';
=======
import './styles/index.css';
import App from './containers/App';
>>>>>>> ep/layout-1.0
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Notes />, document.getElementById('notes'));
//ReactDOM.render(<Bookmarks />, document.getElementById('bookmarks'));
registerServiceWorker();

