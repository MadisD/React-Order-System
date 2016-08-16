const React = require('react');
const ReactDOM = require('react-dom');
import App from './components/App';
import Layout from './components/Layout';
const {Router, Route, IndexRoute, hashHistory} = require('react-router');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={App}/>
            {/*<Route path="edit/:id" component={Edit}/>*/}
        </Route>
    </Router>,
    document.getElementById('app')
);
