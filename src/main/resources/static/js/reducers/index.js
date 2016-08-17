const {combineReducers} = require('redux');

import clientReducer from "./clientReducer"

export default combineReducers({
    clients: clientReducer,
})