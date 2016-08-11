const React = require('react');
import Client from './Client';

export default class ClientList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.handleNavFirst = this.handleNavFirst.bind(this);
    //     this.handleNavPrev = this.handleNavPrev.bind(this);
    //     this.handleNavNext = this.handleNavNext.bind(this);
    //     this.handleNavLast = this.handleNavLast.bind(this);
    //     this.handleInput = this.handleInput.bind(this);
    // }
    //
    // handleInput(e) {
    //     e.preventDefault();
    //     var pageSize = React.findDOMNode(this.refs.pageSize).value;
    //     if (/^[0-9]+$/.test(pageSize)) {
    //         this.props.updatePageSize(pageSize);
    //     } else {
    //         React.findDOMNode(this.refs.pageSize).value =
    //             pageSize.substring(0, pageSize.length - 1);
    //     }
    // }
    //
    // handleNavFirst(e) {
    //     e.preventDefault();
    //     this.props.onNavigate(this.props.links.first.href);
    // }
    //
    // handleNavPrev(e) {
    //     e.preventDefault();
    //     this.props.onNavigate(this.props.links.prev.href);
    // }
    //
    // handleNavNext(e) {
    //     e.preventDefault();
    //     this.props.onNavigate(this.props.links.next.href);
    // }
    //
    // handleNavLast(e) {
    //     e.preventDefault();
    //     this.props.onNavigate(this.props.links.last.href);
    // }

    render() {
        var clients = this.props.clients.map(client =>
            // <Client key={client._links.self.href} client={client} onDelete={this.props.onDelete}/>
            <Client key={client._links.self.href} client={client} />
        );
        var navLinks = [];
        // if ("first" in this.props.links) {
        //     navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        // }
        // if ("prev" in this.props.links) {
        //     navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        // }
        // if ("next" in this.props.links) {
        //     navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        // }
        // if ("last" in this.props.links) {
        //     navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        // }

        return (
            <div>
                {/*<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>*/}

                <div>
                    <table>
                        <tbody>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Security Number</th>
                            <th>Phone Number</th>
                            <th>Country</th>
                            <th>Address</th>
                        </tr>
                        {clients}
                        </tbody>
                    </table>
                    {navLinks}
                </div>
            </div>
        )
    }
}