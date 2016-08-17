export default  (state = {
    clientAttributes: [],
    clients: [],
    error: null
}, action) => {
    switch (action.type) {
        case 'LOAD_CLIENTS_FINISHED':
            return {...state, clients: action.payload};
            break;
        case 'LOAD_CLIENT_ATTRIBUTES_FINISHED':
            return {...state, clientAttributes: action.payload};
            break;
        case 'SET_ERROR':
            return {...state, error: action.payload};
            break;
        case 'EDIT_CLIENT':
            const newClients = [...state.clients];
            const clientToChange = newClients.findIndex(tempClient => tempClient._links.self.href === action.payload._links.self.href);
            newClients[clientToChange] = action.payload;
            return {...state, clients: newClients};
            break;
        case 'DELETE_CLIENT':
            return {...state, clients: state.clients.filter(tempClient => tempClient._links.self.href !== action.payload._links.self.href)};
            break;
        case 'CREATE_CLIENT':
            return {...state, clients: [...state.clients, action.payload]};
            break;

    }
    return state;
}