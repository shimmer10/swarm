import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false
    };
  }

  handleInputChange = event => {
    console.log('handle input change on login: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  submitLogin = event => {
    event.preventDefault();
    API.login(this.state)
      .then(res => {
        console.log(res);
        this.setState({redirect: true});
      })
      .catch(err => {
        console.log("in catch for submitlogin form");
        this.setState({redirect: false});
      });

  }

  render() {
    // if redirect is true then go to home
    if (this.state.redirect) return <Redirect to='/home' />;
    // else display login form
    return (
      <div className="inner-container">
        <h2 align="center" className="header">
          Sign-in
            </h2>
        <div className="box">

          <Form onSubmit={this.submitLogin}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Sign-in
            </Button>
          </Form>


        </div>
      </div>
    );
  }

}

export default LoginForm;