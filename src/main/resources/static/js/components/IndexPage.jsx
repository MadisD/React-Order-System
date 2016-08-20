const React = require('react');
import {Link} from 'react-router';

export default class Edit extends React.Component {

    render() {
        return (
            <div>
                <Link to="/create" >
                    Create new order
                </Link>
            </div>
        );
    }
}