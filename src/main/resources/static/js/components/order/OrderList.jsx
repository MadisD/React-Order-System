import React from 'react';
import {connect} from 'react-redux';
import Order from './Order';
import {loadOrdersInfo} from '../../actions/orderActions';

@connect((store) => {
    return {
        orders: store.orders.orders,
        error: store.orders.error,
    };
})
export default class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(loadOrdersInfo());
    }

    renderError() {
        if (!this.props.error) {
            return null;
        }
        return <div style={{color: 'red'}}>{this.props.error}</div>;
    }

    validateInput(attribute, value) {
        if (!value) {
            return attribute + " cant be empty";
        }
        return null;
    }


    render() {
        var orders = this.props.orders.map(
            order =>
                <Order
                    key={order._links.self.href}
                    order={order}
                    renderError={this.renderError}
                    validateInput={this.validateInput}
                    {...this.props}
                />
        );

        return (
            <div>
                <div>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Order ID</th>
                            <th>Price</th>
                            <th>Currency</th>
                            <th>Transaction date</th>
                            <th>Client name</th>
                            <th>Product name</th>
                            <th/>
                            <th/>
                        </tr>
                        {orders}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}