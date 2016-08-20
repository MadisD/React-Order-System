export default  (state = {
    orders: [],
}, action) => {
    switch (action.type) {
        case 'LOAD_ORDERS_FINISHED':
            return {...state, orders: action.payload};
            break;
        case 'NEW_ORDER':
            return {...state, orders: [...state.orders, action.payload]};
            break;
        case 'NEW_ORDER_FINISHED':
            return {...state};
            break;
    }
    return state;
}