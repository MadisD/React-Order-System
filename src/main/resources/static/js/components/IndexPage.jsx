const React = require('react');
import {Link} from 'react-router';

export default class Edit extends React.Component {

    render() {
        var divStyle = {
            textAlign: 'center',
            marginTop: '20%',
            fontSize: '22px'
        };

        return (
            <div>
                <div style={divStyle}>
                    <Link to="/create">
                        Create new order
                    </Link>
                </div>
            </div>
        );
    }
}