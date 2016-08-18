export default  (state = {
    orderAttributes: [],
    orders: [],
    error: null,
}, action) => {
    switch (action.type) {
        case 'LOAD_ORDERS_FINISHED':
            return {...state, orders: action.payload};
            break;
        case 'LOAD_ORDER_ATTRIBUTES_FINISHED':
            return {...state, orderAttributes: action.payload};
            break;
        case 'SET_ERROR':
            return {...state, error: action.payload};
            break;
        case 'NEW_ORDER':
            return {...state, orders: [...state.orders, action.payload]};
            break;
    }
    return state;
}