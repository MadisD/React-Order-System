const {combineReducers} = require('redux');

import clientReducer from "./clientReducer"
import productReducer from "./productReducer"

export default combineReducers({
    clients: clientReducer,
    products: productReducer,
})