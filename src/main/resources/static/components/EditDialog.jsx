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
        const {client}= this.props;
        const id = client._links.self.href.split('/').pop();
        newClient['id'] = id;

        this.props.attributes.forEach(attribute => {
            newClient[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
        });

        this.props.onEdit(newClient);
        $("#myEdit" + id).modal("hide");
    }

    render() {
        const {client}= this.props;
        const id = client._links.self.href.split('/').pop();
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
                                <form>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="name" ref="name"
                                           className="field" defaultValue={client.name}/>
                                    <label htmlFor="description">Description</label>
                                    <input id="description" type="text" placeholder="description" ref="description"
                                           className="field" defaultValue={client.description}/>
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