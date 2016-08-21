import React from 'react';
import ReactDOM from 'react-dom';
import {createProduct, setError} from '../../actions/productActions'

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newProduct = {};
        var {attributes, dispatch}= this.props;

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
        dispatch(createProduct(newProduct));

        for (attribute of attributes) {
            ReactDOM.findDOMNode(this.refs[attribute]).value = "";
        }

        $("#create-product-modal").modal("hide");
    }

    render() {
        var inputs = this.props.attributes.map(attribute => {

            if (attribute === 'releaseDate') {
                return <div className="form-group" key={attribute}>
                    <label htmlFor={attribute}>{attribute}</label>
                    <input type="date" placeholder={attribute} id={attribute} ref={attribute} className="field form-control"/>
                </div>;
            }else if (attribute === 'price') {
                return <div className="form-group" key={attribute}>
                    <div className="input-group">
                        <label htmlFor={attribute}>{attribute}</label>
                        <input type="number" placeholder={attribute} id={attribute} ref={attribute} className="field form-control"/>
                        <div class="input-group-addon">€</div>
                    </div>
                </div>;
            }
            return (
                <div className="form-group" key={attribute}>
                    <label htmlFor={attribute}>{attribute}</label>
                    <input type="text" placeholder={attribute} id={attribute} ref={attribute} className="field form-control"/>
                </div>)
                ;

        });
        return (
            <div>
                <button type="button" class="btn btn-success " data-toggle="modal" data-target="#create-product-modal">
                    Create new product
                </button>
                <div id="create-product-modal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Create new product</h4>
                            </div>
                            <div class="modal-body">
                                {this.props.renderError()}
                                <form>
                                    {inputs}
                                    <button className="btn btn-block btn-primary" onClick={this.handleSubmit}>Create
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