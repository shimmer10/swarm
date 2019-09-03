import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class FormStatus extends Component {
    state = {
        status: "Choose Status"
    }

    // handle status selection
    handleStatusSelect(event) {
        var status = event.target.value;
        this.setState({ status })
    }
    
    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" onChange={this.handleStatusSelect.bind(this)}>
                    <option value="choose status">Choose Status</option>
                    <option value="clear">Clear</option>
                    <option value="impeded">Impeded</option>
                    <option value="blocked">Blocked</option>
                </Form.Control>
                {this.state.status === "blocked" &&
                    (<Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Blocker</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="What is blocking you?" />
                    </Form.Group>)}
            </Form.Group>
        )
    }
}

export default FormStatus;