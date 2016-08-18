import React from 'react';
import {Link} from 'react-router';

export default class Navigation extends React.Component {

    render() {
        const {location} = this.props;
        const clientClass = location.pathname === "/^\/clients/" ? "active" : "";
        const productClass = location.pathname.match(/^\/products/) ? "active" : "";
        const orderClass = location.pathname.match(/^\/orders/) ? "active" : "";
        return (
            <ul class="nav nav-tabs">
                <li role="presentation" className={clientClass}><Link to='/clients'>Clients</Link></li>
                <li role="presentation" className={productClass}><Link to='/products'>Products</Link></li>
                <li role="presentation" className={orderClass}><Link to='/orders'>Orders</Link></li>
            </ul>
        );
    }

}