import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import Layout from './js/components/Layout';
import store from './js/store';
import ProductList from './js/components/product/ProductList';
import ClientList from './js/components/client/ClientList';
import OrderList from './js/components/order/OrderList';
import CreateOrder from './js/components/order/CreateOrder';
import IndexPage from './js/components/IndexPage';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={IndexPage}/>
                <Route path="clients" component={ClientList}/>
                <Route path="products" component={ProductList}/>
                <Route path="create" component={CreateOrder}/>
                <Route path="orders" component={OrderList}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
