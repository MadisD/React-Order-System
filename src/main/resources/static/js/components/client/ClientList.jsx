import React from 'react';
import {connect} from 'react-redux';
import Client from './Client';
import CreateDialog from './CreateDialog';
import {loadClientsInfo} from '../../actions/clientActions'
import {loadCountries} from '../../actions/countryActions'

@connect((store) => {
    return {
        clients: store.clients.clients,
        attributes: store.clients.clientAttributes,
        countries: store.countries.countries,
        error: store.clients.error
    };
})
export default class ClientList extends React.Component {

    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(loadClientsInfo());
        this.props.dispatch(loadCountries());
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
        if (attribute === 'securityNr') {
            var re = new RegExp('[0-9]{11}');
            if (!re.test(value.trim())) {
                return "Not a valid security number!";
            }
        }
        if (attribute === "firstName" || attribute === "lastName" || attribute === "phoneNr") {
            if (value.length < 3) {
                return attribute + " must be longer than 3";
            }
        }
        return null;
    }

    renderClientsList() {

        if (this.props.clients.length === 0) {
            return (
                <div>
                    <h2 style={{color: 'red'}}> No clients to show</h2>
                </div>
            );
        }

        var clients = this.props.clients.map(
            client =>
                <Client
                    key={client._links.self.href}
                    client={client}
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
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Security number</th>
                        <th>Phone number</th>
                        <th>Country</th>
                        <th>Address</th>
                        <th/>
                        <th/>
                    </tr>
                    {clients}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderClientsList()}
                <CreateDialog
                    attributes={this.props.attributes}
                    dispatch={this.props.dispatch}
                    validateInput={this.validateInput}
                    renderError={this.renderError}
                    countries={this.props.countries}
                />
            </div>
        )
    }
}