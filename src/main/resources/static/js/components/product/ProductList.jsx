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
        return null;
    }

    render() {

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