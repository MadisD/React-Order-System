const React = require('react');
import EditProduct from './EditProduct';
import {deleteProduct} from '../../actions/productActions'
export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.dispatch(deleteProduct(this.props.product));
    }

    render() {
        var {product} = this.props;
        return (
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.barcode}</td>
                <td>{product.description}</td>
                <td>{product.releaseDate}</td>
                <td>
                    <EditProduct
                        {...this.props}
                    />
                </td>
                <td>
                    <button className="btn btn-sm btn-secondary" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}