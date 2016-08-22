import React from 'react';
import {connect} from 'react-redux';
import Order from './Order';
import {loadOrdersInfo, loadOrdersBy} from '../../actions/orderActions';

@connect((store) => {
    return {
        orders: store.orders.orders,
        error: store.orders.error,
    };
})
export default class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortTypes: {
                id: 'id',
                productName: 'product.name',
                price: 'productPrice',
                transactionDate: 'transactionDate',
                clientFirstName: 'client.firstName',
                clientLastName: 'client.lastName',
                securityCode: 'client.securityCode',
            }
        };
        this.validateInput = this.validateInput.bind(this);
        this.renderError = this.renderError.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.renderOrders = this.renderOrders.bind(this);
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

    handleSort(e) {
        var {dispatch} = this.props;
        var direction = $('input[name="directions"]:checked').val();
        var sortType = $('#order-type').val();
        dispatch(loadOrdersBy(sortType, direction));
    }

    renderOrders() {

        if (this.props.orders.length === 0) {
            return (
                <div>
                    <h2 style={{color: 'red'}}> No orders have been made</h2>
                </div>
            );
        }

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

        var options = Object.keys(this.state.sortTypes).map(
            type => {
                return <option value={this.state.sortTypes[type]} key={type}>{type}</option>;
            }
        );

        return (
            <div>
                <div className="form-group">
                    <h4>Sorted by: </h4>
                    <select className="form-control" id="order-type" name="order-type" defaultValue="id" onChange={this.handleSort}>
                        {options}
                    </select>
                    <fieldset className="form-group">
                        <div class="radio">
                            <label>
                                <input type="radio" onChange={this.handleSort} name="directions" id="asc" value="asc" defaultChecked/>
                                Ascending
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" onChange={this.handleSort} name="directions" id="desc" value="desc"/>
                                Descending
                            </label>
                        </div>
                    </fieldset>
                </div>
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
        );
    }

    render() {
        return (
            <div>
                {this.renderOrders()}
            </div>
        )
    }
}