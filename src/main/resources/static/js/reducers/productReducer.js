export default  (state = {
    productAttributes: [],
    products: [],
    error: null
}, action) => {
    switch (action.type) {
        case 'LOAD_PRODUCTS_FINISHED':
            return {...state, products: action.payload};
            break;
        case 'LOAD_PRODUCT_ATTRIBUTES_FINISHED':
            return {...state, productAttributes: action.payload};
            break;
        case 'SET_ERROR':
            return {...state, error: action.payload};
            break;
        case 'EDIT_PRODUCT':
            const newProducts = [...state.products];
            const clientToChange = newProducts.findIndex(tempProduct => tempProduct._links.self.href === action.payload._links.self.href);
            newProducts[clientToChange] = action.payload;
            return {...state, products: newProducts};
            break;
        case 'DELETE_PRODUCT':
            return {...state, products: state.products.filter(tempProduct => tempProduct._links.self.href !== action.payload._links.self.href)};
            break;
        case 'CREATE_PRODUCT':
            return {...state, products: [...state.products, action.payload]};
            break;

    }
    return state;
}