import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class FormStatus extends Component {
    state = {
        status: "Choose Status"
    }

    // handle status selection
    handleStatusSelect(event) {
        var status = event.target.value;
        this.setState({ status });
        {this.props.data(status)};
    }

    // handle Blocker Description
    handleBlockerDescription(event) {
        var blockerDescription = event.target.value;
        {this.props.data(blockerDescription)};
        
    }

    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label className="card-label">Status</Form.Label>
                <Form.Control as="select" onChange={this.handleStatusSelect.bind(this)}>
                    <option value="choose status">Choose Status</option>
                    <option value="GREEN">Clear</option>
                    <option value="YELLOW">Impeded</option>
                    <option value="RED">Blocked</option>
                </Form.Control>
                {this.state.status === "RED" &&
                    (<Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Blocker</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="What is blocking you?" onChange={this.handleBlockerDescription.bind(this)} />
                    </Form.Group>)}
            </Form.Group>
        )
    }
}

export default FormStatus;