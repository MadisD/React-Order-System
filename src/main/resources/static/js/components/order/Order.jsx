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

    mockEntity() {
        clientAPI({
            method: 'POST',
            path: 'http://localhost:8080/api/orders',
            entity: {
                productPrice: 222,
                transactionDate: "2016-08-18T15:21:45.129+0000",
            },
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            var clientPath = response.entity._links.client.href;
            var productPath = response.entity._links.product.href;

            rest({
                method: 'PUT',
                path: clientPath,
                entity: "http://localhost:8080/api/clients/2",
                headers: {'Content-Type': 'text/uri-list'}
            });

            rest({
                method: 'PUT',
                path: productPath,
                entity: "http://localhost:8080/api/products/2",
                headers: {'Content-Type': 'text/uri-list'}
            });

        });
    }

    componentWillMount() {
        const clientPath = this.props.order._links.client.href;
        const productPath = this.props.order._links.product.href;
        this.fetchEntity(clientPath, 'client');
        this.fetchEntity(productPath, 'product');
        // this.mockEntity();
    }

    render() {
        var {order} = this.props;
        var {client, product} = this.state;
        const id = order._links.self.href.split('/').pop();
        const name = client.firstName + ' ' + client.lastName;

        return (
            <tr>
                <td>{id}</td>
                <td>{order.productPrice}</td>
                <td>{order.transactionDate}</td>
                <td>{name}</td>
                <td>{product.name}</td>
                <td>
                </td>

            </tr>
        );
    }
}