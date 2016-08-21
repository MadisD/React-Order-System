export default  (state = {
    countries: [],
}, action) => {
    switch (action.type) {
        case 'LOAD_COUNTRIES_FINISHED':
            return {...state, countries: action.payload};
            break;
    }
    return state;
}