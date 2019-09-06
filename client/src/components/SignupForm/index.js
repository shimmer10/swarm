import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import './style.css';


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
  redirectLocation = '';  // set when we want to redirect. used when this.state.redirect is true

  handleInputChange = event => {
    console.log('handle input change on signup: ' + event.target.name + ' ' + event.target.value.toUpperCase());
    
    this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  }
  submitRegister = event => {
    event.preventDefault();
    API.register(this.state)
      .then(res => {
        console.log(res.data);
        // set logged in user into session storage for retreival by other components
        sessionStorage.setItem("userID", res.data.id);
        sessionStorage.setItem("firstName", res.data.first_name);
        sessionStorage.setItem("lastName", res.data.last_name);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("email", res.data.email);

        this.redirectLocation = '/home';
        this.setState({ redirect: true });  // causes a re-render so put it last
      })
      .catch(err => {
        console.log("in catch for submitlogin form");
        console.log(err);
        this.redirectLocation = '/authfailure';
        this.setState({ redirect: true });   // causes a re-render so put it last
      });
  }

  render() {
    // if redirect is true then go elsewhere
    if (this.state.redirect) {
      return <Redirect to={this.redirectLocation} />;
    }
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
                  <option>DEVELOPER</option>
                  <option>SCRUM MASTER</option>
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