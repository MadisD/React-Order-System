const {combineReducers} = require('redux');

import clientReducer from "./clientReducer"
import productReducer from "./productReducer"
import orderReducer from "./orderReducer"
import countryReducer from "./countryReducer"

export default combineReducers({
    clients: clientReducer,
    products: productReducer,
    orders: orderReducer,
    countries: countryReducer,
})