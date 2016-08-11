const React = require('react');
const ReactDOM = require('react-dom');

export default class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newClient = {};
        this.props.attributes.forEach(attribute => {
            newClient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newClient);

        $('#myModal').hide();
        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            ReactDOM.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        $('.modal-backdrop').click();
    }

    removeModal(){
        $('#myModal').hide();
    }

    render() {
        var inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field"/>
            </p>
        );

        return (
            <div>
                <button type="button" class="btn btn-info " data-toggle="modal" data-target="#myModal">
                    Create new client
                </button>
                <div id="myModal" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Create new client</h4>
                            </div>
                            <div class="modal-body">
                                <form>
                                    {inputs}
                                    <button onClick={this.handleSubmit}>Create</button>
                                    <button onClick={this.removeModal}>Remove</button>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}