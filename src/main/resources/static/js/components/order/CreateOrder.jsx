import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {fetchClients} from '../../actions/clientActions'
import {fetchProducts} from '../../actions/productActions'
import {createOrder} from '../../actions/orderActions'
import {loadCountries} from '../../actions/countryActions'
import rest from 'rest';
import mime from 'rest/interceptor/mime';
const restAPI = rest.wrap(mime);

// import {hashHistory} from 'react-router';

@connect((store) => {
    return {
        clients: store.clients.clients,
        products: store.products.products,
        countries: store.countries.countries,
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
            productError: null,
            price: null,
            currency: "EUR"
        };
        this.convertPrice = this.convertPrice.bind(this);
        this.renderOrderPrice = this.renderOrderPrice.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

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

        this.convertPrice(clientRef, productRef);
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
            return <div className="container">
                <h2>Client Details</h2>
                <ul>
                    <li><h4>Name:</h4>{client.firstName + ' ' + client.lastName}</li>
                    <li><h4>Security number:</h4>{client.securityNr}</li>
                    <li><h4>Phone number:</h4>{client.phoneNr}</li>
                    <li><h4>Country:</h4>{client.country}</li>
                    <li><h4>Address:</h4>{client.address}</li>
                </ul>
            </div>
        }
        return null;
    }

    renderProductDetails() {
        var {product} = this.state;
        if (product) {
            return <div className="container">
                <h2>Product Details</h2>
                <ul>
                    <li><h4>Name:</h4>{product.name}</li>
                    <li><h4>Price:</h4>{product.price}€</li>
                    <li><h4>Barcode:</h4>{product.barcode}</li>
                    <li><h4>Description</h4>{product.description}</li>
                </ul>
            </div>
        }
        return null;
    }

    convertPrice(clientRef, productRef) {
        var {dispatch} = this.props;
        var {client, product} = this.state;
        if (client) {
            var country = _.find(this.props.countries, country => country.name === client.country);
            var newCurrency = country.currencies[0];

            this.setState({currency: newCurrency}, ()=> {
                if (product) {
                    if (this.state.currency === "EUR") {
                        this.setState({price: product.price}, () => {
                            dispatch(createOrder(this.state.price, this.state.currency, clientRef, productRef))
                        });
                    } else {
                        restAPI({
                            method: 'GET',
                            path: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22EUR" + this.state.currency + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
                        }).then(response => {
                            if (response.status.code === 200) {
                                var rate = response.entity.query.results.rate.Rate;
                                var newPrice = product.price * rate;
                                var roundedPrice = _.round(newPrice, 2);
                                this.setState({price: roundedPrice}, () => {
                                    console.log(roundedPrice, this.state.currency);
                                    dispatch(createOrder(roundedPrice, this.state.currency, clientRef, productRef))
                                });
                            }
                            else {
                                this.setState({currency: "EUR"}, () => {
                                    this.setState({price: product.price}, () => {
                                        dispatch(createOrder(this.state.price, this.state.currency, clientRef, productRef))
                                    });
                                });
                            }
                        });
                    }
                }

            });
        }
    }


    renderOrderPrice() {
        if (this.state.price) {
            return <div>
                <h3>Price</h3>
                <p>{this.state.price + ' ' + this.state.currency}</p>
            </div>;
        }
        return null;
    }

    validateInput(attribute, value) {
        if (!value) {
            return attribute + " has to be selected!";
        }
        return null;
    }

    renderClientError() {
        if (!this.state.clientError) {
            return null;
        }
        return <div style={{color: 'red'}}>{this.state.clientError}</div>;
    }

    renderProductError() {
        if (!this.state.productError) {
            return null;
        }
        return <div style={{color: 'red'}}>{this.state.productError}</div>;
    }

    componentWillMount() {
        this.props.dispatch(fetchClients());
        this.props.dispatch(fetchProducts());
        this.props.dispatch(loadCountries());
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
                        <select defaultValue="1" class="form-control" ref="clientSelect"
                                onChange={this.handleClientDetails.bind(this)}
                                id="clientSelect">
                            <option value="1" disabled hidden>Choose client</option>
                            {clientOptions}
                        </select>
                        {this.renderClientError()}
                    </div>

                    <div id="product" class="form-group">
                        <label for="productSelect">Select product from list</label>
                        <select defaultValue="1" class="form-control" ref="productSelect"
                                onChange={this.handleProductDetails.bind(this)}
                                id="productSelect">
                            <option value="1" disabled hidden>Choose product</option>
                            {productOptions}
                        </select>
                        {this.renderProductError()}
                    </div>
                </form>
                <div className="container">
                    <div className="col-sm-6">
                        {this.renderClientDetails()}
                    </div>
                    <div className="col-sm-6">
                        {this.renderProductDetails()}
                    </div>
                </div>
                {this.renderOrderPrice()}
                <button className="btn btn-lg btn-block btn-success" onClick={this.handleSubmit}>Confirm order</button>
            </div>
        )
    }
}