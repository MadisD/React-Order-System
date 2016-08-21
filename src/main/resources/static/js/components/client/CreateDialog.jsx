import React from 'react';
import ReactDOM from 'react-dom';
import {createClient, setError} from '../../actions/clientActions'

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newClient = {};
        var {attributes, dispatch}= this.props;

        var attribute = '';
        for (attribute of attributes) {
            const value = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
            const errorMsg = this.props.validateInput(attribute, value);
            if (errorMsg) {
                dispatch(setError(errorMsg));
                return;
            }
            newClient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        }

        dispatch(setError(null));
        dispatch(createClient(newClient));

        for (attribute of attributes) {
            ReactDOM.findDOMNode(this.refs[attribute]).value = "";
        }

        $("#myModal").modal("hide");
    }


    renderCountries(){
        var countryOptions = this.props.countries.map(country =>
            <option key={country.name} value={country.name}>
                {country.name}
            </option>
        );
        return <p className="form-group" key="country">
            <select defaultValue="" class="form-control" ref="country" id="countrySelect">
                <option value= "" disabled hidden>Select country</option>
                {countryOptions}
            </select>
        </p>;
    }


    render() {
        var inputs = this.props.attributes.map(attribute => {
                if (attribute === 'country') {
                    return this.renderCountries();
                }

                return <p className="form-group" key={attribute}>
                    <input type="text" placeholder={attribute} ref={attribute} className="field form-control"/>
                </p>;
            }
        );

        return (
            <div>
                <button type="button" class="btn btn-success " data-toggle="modal" data-target="#myModal">
                    Create new client
                </button>
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Create new client</h4>
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