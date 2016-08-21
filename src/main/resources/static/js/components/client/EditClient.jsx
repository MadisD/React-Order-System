const React = require('react');
const ReactDOM = require('react-dom');
import {setError, updateClient} from '../../actions/clientActions'

export default class EditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newClient = {};
        var {client, attributes, dispatch}= this.props;
        const id = client._links.self.href.split('/').pop();
        newClient['id'] = id;

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
        dispatch(updateClient(newClient));

        $("#myEdit" + id).modal("hide");
    }

    renderCountries(){
        var countryOptions = this.props.countries.map(country =>
            <option key={country.name} value={country.name}>
                {country.name}
            </option>
        );
        return <p className="form-group" key="country">
            <label for="countrySelect">Country</label>
            <select defaultValue={this.props.client.country} class="form-control" ref="country" id="countrySelect">
                {countryOptions}
            </select>
        </p>;
    }


    render() {
        var {client, attributes}= this.props;
        const id = client._links.self.href.split('/').pop();

        var inputs = attributes.map(attribute => {
                if (attribute === 'securityNr') {
                    return <p class="form-group" key={attribute}>
                        <label htmlFor={attribute}>{attribute}</label>
                        <input id={attribute} type="text" placeholder={attribute} ref={attribute}
                               defaultValue={client[attribute]}
                               className="field form-control" readOnly/>
                    </p>;
                }
                else if (attribute === 'country') {
                    return this.renderCountries();
                }
                return <p class="form-group" key={attribute}>
                    <label htmlFor={attribute}>{attribute}</label>
                    <input id={attribute} type="text" placeholder={attribute} ref={attribute}
                           defaultValue={client[attribute]}
                           className="field form-control"/>
                </p>;
            }
        );

        return (
            <div>
                <button className="btn btn-sm btn-primary" type="button" data-toggle="modal"
                        data-target={"#myEdit" + id}>
                    Edit
                </button>
                <div id={"myEdit" + id} class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit client</h4>
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