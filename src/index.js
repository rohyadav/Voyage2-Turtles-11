import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './containers/App';
import {  register } from './registerServiceWorker';
import './styles/0_bootstrap.css';


ReactDOM.render(<App />, document.getElementById('App'));

register();