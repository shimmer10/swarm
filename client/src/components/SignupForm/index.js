import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import './style.css';
import Col from "react-bootstrap/Col";


class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      role: '',
      email: '',
      password: ''
    };
  }
  handleInputChange = event => {
    console.log('handle input change on signup: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  submitRegister = event => {
    event.preventDefault();
    API.register(this.state)
      .then(res => {
        // all is good now go home
        window.location.href = '/home';
      })
      .catch(err => {
        this.setState({ error: err.message })
        window.location.href = '/authenticateFailure';
      });
  }

  render() {
    return (
      <div className="inner-container">
        <h2 align="center" className="header">
          Sign-up
        </h2>
        <div className="box">

        <Form onSubmit={this.submitRegister}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridfirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="firstname" placeholder="First Name" onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="last name" placeholder="Last Name" onChange={this.handleInputChange} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleInputChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.handleInputChange} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridRole">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" onChange={this.handleInputChange}>
              <option>Choose...</option>
              <option>Developer</option>
              <option>Scrum Master</option>
            </Form.Control>
            </Form.Group>
          </Form.Row>
            <Button variant="primary" type="submit">
              Sign-up
            </Button>
          </Form>


              
        </div>
      </div>
    );
  }
}

export default SignupForm;