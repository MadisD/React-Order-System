import React from 'react';
import {connect} from 'react-redux';
import {loadProductsInfo} from '../../actions/productActions';
import Product from './Product';
import CreateProduct from './CreateProduct';

@connect((store) => {
    return {
        products: store.products.products,
        attributes: store.products.productAttributes,
        error: store.products.error
    };
})
export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(loadProductsInfo());
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
        if (attribute === "name") {
            if (value.length < 3) {
                return attribute + " must be longer than 3";
            }
        }
        if (attribute === "barcode" || attribute === "price") {
            if (value < 0) {
                return attribute + " cannot have a negative value";
            }
            if (attribute === "barcode") {
                var re = new RegExp('^\\d+$');
                if (!re.test(value.trim())) {
                    return attribute + " must be an integer";
                }
            }
        }
        return null;
    }

    renderProductList() {
        if (this.props.products.length === 0) {
            return (
                <div>
                    <h2 style={{color: 'red'}}> No clients to show</h2>
                </div>
            );
        }

        var products = this.props.products.map(
            product =>
                <Product
                    key={product._links.self.href}
                    product={product}
                    renderError={this.renderError}
                    validateInput={this.validateInput}
                    {...this.props}
                />
        );

        return (
            <div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Barcode</th>
                        <th>Description</th>
                        <th>Release date</th>
                        <th/>
                        <th/>
                    </tr>

                    {products}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {

        return (
            <div>
                {this.renderProductList()}
                <CreateProduct
                    attributes={this.props.attributes}
                    dispatch={this.props.dispatch}
                    validateInput={this.validateInput}
                    renderError={this.renderError}
                />
            </div>
        )
    }
}