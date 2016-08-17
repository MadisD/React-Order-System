const rest = require('rest');
const _ = require('lodash');
const mime = require('rest/interceptor/mime');
const clientAPI = rest.wrap(mime);

const root = 'http://localhost:8080/api/';

export function loadClientsInfo() {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root + 'clients',
        }).then(response => {
            dispatch({type: 'LOAD_CLIENTS_FINISHED', payload: response.entity._embedded.clients});
            clientAPI({
                method: 'GET',
                path: response.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(
                schema => {
                    dispatch({type: 'LOAD_CLIENT_ATTRIBUTES_FINISHED', payload: Object.keys(schema.entity.properties)});
                }
            );

        });
    }
}

export function createClient(client) {
    return (dispatch) => {
        clientAPI({
            method: 'POST',
            path: root + 'clients',
            entity: client,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status.code == 201) {
                dispatch({type: 'CREATE_CLIENT', payload: response.entity});
            }
        });
    }
}

export function updateClient(newClient) {
    const clientPath = root + 'clients' + '/' + newClient.id;
    const newInfo = _.omit(newClient, 'id');
    return (dispatch) => {
        clientAPI({
            method: 'PUT',
            path: clientPath,
            entity: newInfo,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            dispatch({type: 'EDIT_CLIENT', payload: response.entity});
        });
    }

}

export function deleteClient(client) {
    return (dispatch) => {
        clientAPI({
            method: 'DELETE',
            path: client._links.self.href
        }).then(response => {
            dispatch({type: 'DELETE_CLIENT', payload: client});
        });
    };

}

export function setError(errorMsg) {
    return (dispatch)=> {
        if (errorMsg) {
            dispatch({type: 'SET_ERROR', payload: errorMsg});
        }
        else {
            dispatch({type: 'SET_ERROR', payload: null});
        }
    };

}