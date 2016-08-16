const _ = require('lodash');
const mime = require('rest/interceptor/mime');
const React = require('react');
const rest = require('rest');
const clientAPI = rest.wrap(mime);

import ClientList from './ClientList';
import CreateDialog from './CreateDialog';

const root = 'http://localhost:8080/api/';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            clients: []
        };
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    loadFromServer() {
        clientAPI({
            method: 'GET',
            path: root + 'clients',
        }).then(response => {
            this.setState({
                clients: response.entity._embedded.clients,
            });
            return clientAPI({
                method: 'GET',
                path: response.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(
                schema => {
                    this.setState({
                        attributes: Object.keys(schema.entity.properties)
                    });
                    return schema;
                }
            );

        });
    }

    onCreate(newClient) {
        clientAPI({
            method: 'POST',
            path: root + 'clients',
            entity: newClient,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.status.code == 201) {
                this.state.clients.push(response.entity);
                this.setState({
                    clients: this.state.clients
                })
            }
        });
    }

    onDelete(client) {
        clientAPI({
            method: 'DELETE',
            path: client._links.self.href
        }).then(response => {
            _.remove(this.state.clients, iterClient => {
                return iterClient._links.self.href === client._links.self.href;
            });
            this.setState({clients: this.state.clients});
        });
    }

    onEdit(client){
        const clientPath = root + 'clients/' + client.id;
        const newInfo = _.omit(client, 'id');

        clientAPI({
            method: 'PUT',
            path: clientPath,
            entity: newInfo,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            const clientToChange = _.findIndex(this.state.clients, iterClient => {
                return iterClient._links.self.href === response.entity._links.self.href;
            });
            this.state.clients[clientToChange] = response.entity;
            this.setState({clients: this.state.clients});
        });
    }

    componentDidMount() {
        this.loadFromServer();
    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <ClientList attributes={this.state.attributes} clients={this.state.clients} onEdit={this.onEdit} onDelete={this.onDelete}/>
            </div>
        )
    }
}