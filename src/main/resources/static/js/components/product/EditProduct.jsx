const React = require('react');
const ReactDOM = require('react-dom');
import {setError, updateProduct} from '../../actions/productActions'

export default class EditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newProduct = {};
        var {product, attributes, dispatch}= this.props;
        const id = product._links.self.href.split('/').pop();
        newProduct['id'] = id;

        var attribute = '';
        for (attribute of attributes) {
            const value = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
            const errorMsg = this.props.validateInput(attribute, value);
            if (errorMsg) {
                dispatch(setError(errorMsg));
                return;
            }
            newProduct[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        }
        dispatch(setError(null));
        dispatch(updateProduct(newProduct));

        $("#my-product-edit" + id).modal("hide");
    }

    render() {
        var {product, attributes}= this.props;
        const id = product._links.self.href.split('/').pop();

        var inputs = attributes.map(attribute => {

            if (attribute === 'barcode') {
                return <div class="form-group" key={attribute}>
                    <label htmlFor={attribute}>{attribute}</label>
                    <input id={attribute} type="text" placeholder={attribute} ref={attribute}
                           defaultValue={product[attribute]}
                           className="field form-control" readOnly/>
                </div>;
            }
            else if (attribute === 'releaseDate') {
                return <div class="form-group" key={attribute}>
                    <label htmlFor={attribute}>{attribute}</label>
                    <input id={attribute} type="date" placeholder={attribute} ref={attribute}
                           defaultValue={product[attribute]}
                           className="field form-control"/>
                </div>;
            }
            else if (attribute === 'price') {
                return <div className="form-group" key={attribute}>
                    <label htmlFor={attribute}>{attribute}</label>
                    <div className="input-group">
                        <input type="number" placeholder={attribute} ref={attribute}
                               defaultValue={product[attribute]} className="field form-control"/>
                        <div class="input-group-addon">€</div>
                    </div>
                </div>;
            }
            return <p class="form-group" key={attribute}>
                <label htmlFor={attribute}>{attribute}</label>
                <input id={attribute} type="text" placeholder={attribute} ref={attribute}
                       defaultValue={product[attribute]}
                       className="field form-control"/>
            </p>;


        });

        return (
            <div>
                <button className="btn btn-sm btn-primary" type="button" data-toggle="modal"
                        data-target={"#my-product-edit" + id}>
                    Edit
                </button>
                <div id={"my-product-edit" + id} class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit product</h4>
                            </div>
                            <div class="modal-body">
                                {this.props.renderError()}
                                <form className="form">
                                    {inputs}
                                    <button className="btn btn-block btn-primary" onClick={this.handleSubmit}>Save
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}