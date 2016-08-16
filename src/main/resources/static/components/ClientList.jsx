const React = require('react');
import Client from './Client';

export default class ClientList extends React.Component {

    render() {
        var clients = this.props.clients.map(
            client =>
                <Client
                    attributes={this.props.attributes}
                    key={client._links.self.href}
                    client={client}
                    onDelete={this.props.onDelete}
                    onEdit={this.props.onEdit}
                />
        );

        return (
            <div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <th>Description</th>
                                <th/>
                                <th/>
                            </tr>

                        {/*/!*<th>Last Name</th>*!/*/}
                        {/*/!*<th>Security Number</th>*!/*/}
                        {/*/!*<th>Phone Number</th>*!/*/}
                        {/*/!*<th>Country</th>*!/*/}
                        {/*/!*<th>Address</th>*!/*/}
                        {/*</tr>*/}
                            {clients}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}