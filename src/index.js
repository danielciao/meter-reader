/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import 'babel-polyfill';
import 'whatwg-fetch';

import AppContainer from './AppContainer';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<AppContainer />, document.getElementById('meter-app'));
});
