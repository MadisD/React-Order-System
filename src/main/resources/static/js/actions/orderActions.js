import rest from 'rest';
import mime from 'rest/interceptor/mime';
const clientAPI = rest.wrap(mime);

const root = 'http://localhost:8080/api/';
const destination = 'orders';

export function loadOrdersInfo() {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root + destination,
        }).then(response => {
            dispatch({type: 'LOAD_ORDERS_FINISHED', payload: response.entity._embedded.orders});
            clientAPI({
                method: 'GET',
                path: response.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(
                schema => {
                    dispatch({
                        type: 'LOAD_ORDER_ATTRIBUTES_FINISHED',
                        payload: Object.keys(schema.entity.properties)
                    });
                }
            );

        });
    }
}

export function createOrder(order) {
    return (dispatch) => {
        clientAPI({
            method: 'POST',
            path: root + destination,
            entity: order,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status.code == 201) {
                dispatch({type: 'NEW_ORDER', payload: response.entity});
            }
        });
    }
}

export function fetchClient(clientPath) {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: clientPath,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            dispatch({type: 'SET_CLIENT', payload: response.entity});
        });
    }
}

// export function fetchProduct(productPath) {
//     return (dispatch) => {
//         clientAPI({
//             method: 'GET',
//             path: productPath,
//             headers: {'Content-Type': 'application/json'}
//         }).then(response => {
//             dispatch({type: 'SET_PRODUCT', payload: response.entity});
//         });
//     }
// }


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




