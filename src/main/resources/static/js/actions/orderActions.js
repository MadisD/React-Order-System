import rest from 'rest';
import mime from 'rest/interceptor/mime';
const clientAPI = rest.wrap(mime);

const root = '/api/';
const destination = 'orders';

export function loadOrdersInfo() {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root + destination + '?size=50',
        }).then(response => {
            dispatch({type: 'LOAD_ORDERS_FINISHED', payload: response.entity._embedded.orders});
        });
    }
}
export function loadOrdersBy(argument, direction) {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root + destination + '?size=50&sort=' + argument + ',' + direction,
        }).then(response => {
            dispatch({type: 'LOAD_ORDERS_FINISHED', payload: response.entity._embedded.orders});
        });
    }
}

export function createOrder(productPrice, currency, clientHref, productHref) {
    return (dispatch) => {
        clientAPI({
            method: 'POST',
            path: root + destination,
            entity: {
                productPrice: productPrice,
                currency: currency,
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
                });
            });


            dispatch({type: 'NEW_ORDER', payload: response.entity});
        });
    }
}