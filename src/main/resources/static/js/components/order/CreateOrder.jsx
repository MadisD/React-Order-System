import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {fetchClients} from '../../actions/clientActions'
import {fetchProducts} from '../../actions/productActions'
import {createOrder} from '../../actions/orderActions'
// import {hashHistory} from 'react-router';

@connect((store) => {
    return {
        clients: store.clients.clients,
        products: store.products.products,
        error: store.orders.error,
    };
})
export default class CreateOrder extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            client: null,
            product: null,
            clientError: null,
            productError: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        var {dispatch}= this.props;
        var clientRef = $('#clientSelect').val();
        var productRef = $('#productSelect').val();
        var clientError = this.validateInput("Client", clientRef);
        var productError = this.validateInput("Product", productRef);

        if (clientError) {
            this.setState({clientError: clientError});
            return;
        }
        this.setState({clientError: null});

        if (productError) {
            this.setState({productError: productError});
            return;

        }
        this.setState({productError: null});

        var newClient = _.find(this.props.clients, client => client._links.self.href === clientRef);
        var newProduct = _.find(this.props.products, product => product._links.self.href === productRef);
        this.setState({client: newClient});
        this.setState({product: newProduct});

        var price = newProduct.price;
        dispatch(createOrder(price, clientRef, productRef));
        // hashHistory.push("/orders");
    }


    handleClientDetails(e) {
        var selectedClient = e.target.value;
        var newClient = _.find(this.props.clients, client => client._links.self.href === selectedClient);
        this.setState({client: newClient});
    }

    handleProductDetails(e) {
        var selectedProduct = e.target.value;
        var newProduct = _.find(this.props.products, product => product._links.self.href === selectedProduct);
        this.setState({product: newProduct});
    }

    renderClientDetails() {
        var {client} = this.state;
        if (client) {
            return <ul>
                <li>Name: {client.firstName + ' ' + client.lastName}</li>
                <li>Security number: {client.securityNr}</li>
                <li>Phone number: {client.phoneNr}</li>
                <li>Country: {client.country}</li>
                <li>Address: {client.address}</li>
            </ul>
        }
        return null;
    }

    renderProductDetails() {
        var {product} = this.state;
        if (product) {
            return <ul>
                <li>Name: {product.name}</li>
                <li>Price: {product.price}</li>
                <li>Barcode: {product.barcode}</li>
                <li>Description: {product.description}</li>
            </ul>
        }
        return null;
    }


    validateInput(attribute, value) {
        if (!value) {
            return attribute + " has to be selected!";
        }
        return null;
    }

    renderClientError(){
        if (!this.state.clientError) {
            return null;
        }
        return <div style={{color: 'red'}}>{this.state.clientError}</div>;
    }

    renderProductError(){
        if (!this.state.productError) {
            return null;
        }
        return <div style={{color: 'red'}}>{this.state.productError}</div>;
    }

    componentWillMount() {
        this.props.dispatch(fetchClients());
        this.props.dispatch(fetchProducts());
    }

    render() {
        var clientOptions = this.props.clients.map(client =>
            <option key={client._links.self.href} value={client._links.self.href}>
                {client.firstName + ' ' + client.lastName}
            </option>
        );
        var productOptions = this.props.products.map(product =>
            <option key={product._links.self.href} value={product._links.self.href}>
                {product.name}
            </option>
        );
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label for="clientSelect">Select client from list</label>
                        <select defaultValue="1" class="form-control" ref="clientSelect" onChange={this.handleClientDetails.bind(this)}
                                id="clientSelect">
                            <option value= "1" disabled hidden>Choose client</option>
                            {clientOptions}
                        </select>
                        {this.renderClientError()}
                    </div>

                    <div id="product" class="form-group">
                        <label for="productSelect">Select product from list</label>
                        <select defaultValue="1" class="form-control" ref="productSelect" onChange={this.handleProductDetails.bind(this)}
                                id="productSelect">
                            <option value= "1" disabled hidden>Choose product</option>
                            {productOptions}
                        </select>
                        {this.renderProductError()}
                    </div>

                    <button className="btn btn-success" onClick={this.handleSubmit}>Confirm</button>
                </form>
                {this.renderClientDetails()}
                {this.renderProductDetails()}
            </div>
        )
    }
}