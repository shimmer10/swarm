import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";


class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      role: '',
      email: '',
      password: '',
      redirect: false
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
        this.setState({ redirect: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ redirect: false });
      });
  }

  render() {
    // if redirect is true then go to home
    if (this.state.redirect) return <Redirect to='/home' />;
    // else display login form
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
                <Form.Control type="firstname" name="firstname" placeholder="First Name" onChange={this.handleInputChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lastname" name="lastname" placeholder="Last Name" onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridRole">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" onChange={this.handleInputChange}>
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