const React = require('react');
const ReactDOM = require('react-dom');
const {Router, Route, IndexRoute, hashHistory} = require('react-router');
const {Provider} = require('react-redux');
import App from './js/components/App';
import Layout from './js/components/Layout';
import store from './js/store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={App}/>
                {/*<Route path="edit/:id" component={Edit}/>*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
