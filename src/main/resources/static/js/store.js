const {applyMiddleware, createStore} = require('redux');
const logger = require('redux-logger');
const thunk = require('redux-thunk').default;
const promise = require('redux-promise-middleware');

import reducers from "./reducers"


export default createStore(reducers, applyMiddleware(thunk, logger()));
