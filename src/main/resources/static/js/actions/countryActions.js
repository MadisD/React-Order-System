import rest from 'rest';
import mime from 'rest/interceptor/mime';
const clientAPI = rest.wrap(mime);

const root = 'https://restcountries.eu/rest/v1/all';

export function loadCountries() {
    return (dispatch) => {
        clientAPI({
            method: 'GET',
            path: root,
        }).then(response => {
            dispatch({type: 'LOAD_COUNTRIES_FINISHED', payload: response.entity});
        });
    }
}