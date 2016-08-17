const _ = require('lodash');
const mime = require('rest/interceptor/mime');
const React = require('react');
const rest = require('rest');
const {connect} = require('react-redux');
import ClientList from './client/ClientList';
import CreateDialog from './CreateDialog';
import {loadClientsInfo} from '../actions/clientActions'

@connect((store) => {
    return {
        clients: store.clients.clients,
        attributes: store.clients.clientAttributes,
        error: store.clients.error
    };
})
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.renderError = this.renderError.bind(this);
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

    componentWillMount() {
        this.props.dispatch(loadClientsInfo());
    }

    render() {
        return (
            <div>
                <ClientList
                    attributes={this.props.attributes}
                    clients={this.props.clients}
                    validateInput={this.validateInput}
                    renderError={this.renderError}
                    dispatch={this.props.dispatch}
                />

                <CreateDialog
                    attributes={this.props.attributes}
                    dispatch={this.props.dispatch}
                    validateInput={this.validateInput}
                    renderError={this.renderError}
                />
            </div>
        );
    }
}