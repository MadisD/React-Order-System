const rest = require('rest');
const _ = require('lodash');
const mime = require('rest/interceptor/mime');
const clientAPI = rest.wrap(mime);

const root = 'http://localhost:8080/api/';

export function loadProductsInfo() {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root + 'products',
        }).then(response => {
            dispatch({type: 'LOAD_PRODUCTS_FINISHED', payload: response.entity._embedded.products});
            clientAPI({
                method: 'GET',
                path: response.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(
                schema => {
                    dispatch({type: 'LOAD_PRODUCT_ATTRIBUTES_FINISHED', payload: Object.keys(schema.entity.properties)});
                }
            );

        });
    }
}

export function fetchProducts() {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root + 'products',
        }).then(response => {
            dispatch({type: 'LOAD_PRODUCTS_FINISHED', payload: response.entity._embedded.products});
            });
    }
}

export function createProduct(product) {
    return (dispatch) => {
        clientAPI({
            method: 'POST',
            path: root + 'products',
            entity: product,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status.code == 201) {
                dispatch({type: 'CREATE_PRODUCT', payload: response.entity});
            }
        });
    }
}

export function updateProduct(newProduct) {
    const productPath = root + 'products' + '/' + newProduct.id;
    const newInfo = _.omit(newProduct, 'id');
    return (dispatch) => {
        clientAPI({
            method: 'PUT',
            path: productPath,
            entity: newInfo,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            dispatch({type: 'EDIT_PRODUCT', payload: response.entity});
        });
    }

}

export function deleteProduct(product) {
    return (dispatch) => {
        clientAPI({
            method: 'DELETE',
            path: product._links.self.href
        }).then(response => {
            dispatch({type: 'DELETE_PRODUCT', payload: product});
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