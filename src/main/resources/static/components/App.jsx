const React = require('react');
const rest = require('rest');
const mime = require('rest/interceptor/mime');
const clientAPI = rest.wrap(mime);

import ClientList from './ClientList';
import CreateDialog from './CreateDialog';

const root = 'http://localhost:8080/api/';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {clients: [], attributes: []};
        // this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        // this.onDelete = this.onDelete.bind(this);
        // this.onNavigate = this.onNavigate.bind(this);
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

    //     follow(clientAPI, root, [
    //         {rel: 'clients', params: {size: pageSize}}]
    //     ).then(clientCollection => {
    //         return clientAPI({
    //             method: 'GET',
    //             path: root,
    //             headers: {'Accept': 'application/schema+json'}
    //         }).then(schema => {
    //             this.schema = schema.entity;
    //             this.schema = schema.entity;
    //             return clientCollection;
    //         });
    //     }).then(clientCollection => {
    //         this.setState({
    //             clients: clientCollection.entity._embedded.clients,
    //             attributes: Object.keys(this.schema.properties),
    //             pageSize: pageSize,
    //             links: clientCollection.entity._links});
    //         console.log(clientCollection.entity._links);
    //     });
    // }
    // onDelete(client) {
    //     clientAPI({method: 'DELETE', path: client._links.self.href}).then(response => {
    //         this.loadFromServer(this.state.pageSize);
    //     });
    // }
    //
    // updatePageSize(pageSize) {
    //     if (pageSize !== this.state.pageSize) {
    //         this.loadFromServer(pageSize);
    //     }
    // }
    //
    // onNavigate(navUri) {
    //     clientAPI({method: 'GET', path: navUri}).then(clientCollection => {
    //         this.setState({
    //             clients: clientCollection.entity._embedded.clients,
    //             attributes: this.state.attributes,
    //             pageSize: this.state.pageSize,
    //             links: clientCollection.entity._links
    //         });
    //     });
    // }
    //
    onCreate(newClient) {
        clientAPI({
            method: 'POST',
            path: root + 'clients',
            entity: newClient,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            this.state.clients.push(newClient);
        });
    }

    componentDidMount() {
        // clientAPI({method: 'GET', path: 'http://localhost:8080/api/clients'}).then(response => {
        //     this.setState({clients: response.entity._embedded.clients});
        // });
        this.loadFromServer();
    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <ClientList clients={this.state.clients}/>
            </div>
        )
    }
}