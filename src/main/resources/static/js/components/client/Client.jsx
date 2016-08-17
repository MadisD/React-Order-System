const React = require('react');
import EditDialog from './EditDialog';
import {deleteClient} from '../../actions/clientActions'
export default class Client extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.dispatch(deleteClient(this.props.client));
    }

    render() {
        var {client} = this.props;
        return (
            <tr>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.securityNr}</td>
                <td>{client.phoneNr}</td>
                <td>{client.country}</td>
                <td>{client.address}</td>
                <td>
                    <EditDialog
                        {...this.props}
                    />
                </td>
                <td>
                    <button className="btn btn-sm btn-secondary" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
    }
}