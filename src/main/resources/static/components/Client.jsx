const React = require('react');
import EditDialog from './EditDialog';
export default class Client extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.client);
    }

    render() {
        return (
            <tr>
                {/*<td>{this.props.client.firstName}</td>*/}
                {/*<td>{this.props.client.lastName}</td>*/}
                {/*<td>{this.props.client.securityNr}</td>*/}
                {/*<td>{this.props.client.phoneNr}</td>*/}
                {/*<td>{this.props.client.country}</td>*/}
                {/*<td>{this.props.client.address}</td>*/}
                <td>{this.props.client.name}</td>
                <td>{this.props.client.description}</td>
                <td>
                    <EditDialog attributes={this.props.attributes} client={this.props.client}
                                onEdit={this.props.onEdit}/>
                </td>
                <td>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}