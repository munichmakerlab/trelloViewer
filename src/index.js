import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

global.jQuery = $;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
