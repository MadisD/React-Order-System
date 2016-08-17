const React = require('react');
const ReactDOM = require('react-dom');

export default class EditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newClient = {};
        var {client, attributes, setError}= this.props;
        const id = client._links.self.href.split('/').pop();
        newClient['id'] = id;

        var attribute = '';
        for (attribute of attributes) {
            const value = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
            const errorMsg = this.props.validateInput(attribute, value);
            if (errorMsg) {
                setError(errorMsg);
                return;
            }
            newClient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        }

        setError(null);

        this.props.onEdit(newClient);
        $("#myEdit" + id).modal("hide");
    }

    render() {
        var {client, attributes}= this.props;
        const id = client._links.self.href.split('/').pop();

        var inputs = attributes.map(attribute =>
            <p key={attribute}>
                <label htmlFor={attribute}>{attribute}</label>
                <input id={attribute} type="text" placeholder={attribute} ref={attribute}
                       defaultValue={client[attribute]}
                       className="field"/>
            </p>
        );

        return (
            <div>
                <button type="button" data-toggle="modal" data-target={"#myEdit" + id}>
                    Edit
                </button>
                <div id={"myEdit" + id} class="modal fade" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Edit client</h4>
                            </div>
                            <div class="modal-body">
                                {this.props.renderError()}
                                <form>
                                    {inputs}
                                    <button onClick={this.handleSubmit}>Save</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}