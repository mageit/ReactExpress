'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import Header from './components/item';

import '../sass/app.scss'

console.log('here');
window.onload = () => {
    ReactDOM.render(<Header/>, document.getElementById('root'));
};
