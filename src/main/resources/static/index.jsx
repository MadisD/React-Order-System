const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, IndexRoute, hashHistory} = require('react-router');
const {Provider} = require('react-redux');
import Layout from './js/components/Layout';
import store from './js/store';
import ProductList from './js/components/product/ProductList';
import ClientList from './js/components/client/ClientList';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                {/*<IndexRoute component={Layout}/>*/}
                <Route path="clients" component={ClientList}/>
                <Route path="products" component={ProductList}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
