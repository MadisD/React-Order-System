const React = require('react');
import Client from './Client';

export default class ClientList extends React.Component {

    render() {
        var clients = this.props.clients.map(
            client =>
                <Client
                    key={client._links.self.href}
                    client={client}
                    {...this.props}
                />
        );

        return (
            <div>
                <div>
                    <table>
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
            </div>
        )
    }
}