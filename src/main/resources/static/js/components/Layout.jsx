const React = require('react');
import Navigation from './Navigation';

export default class Edit extends React.Component {

    render() {
        return (
            <div>
                <Navigation {...this.props}/>
                {this.props.children}
            </div>
        );
    }
}