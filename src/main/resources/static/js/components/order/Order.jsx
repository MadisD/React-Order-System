import React from 'react';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
const clientAPI = rest.wrap(mime);

export default class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            client: {},
            product: {},
        };
    }

    fetchEntity(entityPath, type) {
        clientAPI({
            method: 'GET',
            path: entityPath,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            this.setState({[type]: response.entity});
        });
    }

    componentWillMount() {
        const clientPath = this.props.order._links.client.href;
        const productPath = this.props.order._links.product.href;
        this.fetchEntity(clientPath, 'client');
        this.fetchEntity(productPath, 'product');
    }

    render() {
        var {order} = this.props;
        var {client, product} = this.state;
        const id = order._links.self.href.split('/').pop();
        const name = client.firstName + ' ' + client.lastName;

        var timestamp = order.transactionDate;
        var date = new Date(timestamp).toLocaleString('et-EE', {hour12: false});

        return (
            <tr>
                <td>{id}</td>
                <td>{order.productPrice}</td>
                <td>{order.currency}</td>
                <td>{date}</td>
                <td>{name}</td>
                <td>{client.securityNr}</td>
                <td>{product.name}</td>
                <td>
                </td>

            </tr>
        );
    }
}