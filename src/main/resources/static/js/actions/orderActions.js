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
        });
    }
}

export function createOrder(productPrice, clientHref, productHref) {
    return (dispatch) => {
        clientAPI({
            method: 'POST',
            path: root+ destination,
            entity: {
                productPrice: productPrice,
            },
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            var clientPath = response.entity._links.client.href;
            var productPath = response.entity._links.product.href;

            rest({
                method: 'PUT',
                path: clientPath,
                entity: clientHref,
                headers: {'Content-Type': 'text/uri-list'}
            }).then(response => {
                rest({
                    method: 'PUT',
                    path: productPath,
                    entity: productHref,
                    headers: {'Content-Type': 'text/uri-list'}
                }).then(response => {
                    dispatch({type: 'NEW_ORDER_FINISHED', payload: {}});
                });
            });


            dispatch({type: 'NEW_ORDER', payload: response.entity});
        });
    }
}