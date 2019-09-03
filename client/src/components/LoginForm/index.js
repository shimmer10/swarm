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
      isLoggedIn: false,
      redirect: false
    };
  }

  redirectLocation = '';  // set when we want to redirect. used when this.state.redirect is true

  handleInputChange = event => {
    console.log('handle input change on login: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  submitLogin = event => {
    event.preventDefault();
    API.login(this.state)
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

  getNav = event => {
   
      console.log("in the getNav..." + sessionStorage);
      if (sessionStorage.userID == undefined) {
        console.log("not logged in");
        this.setState({ isLoggedIn: false });
      } else {
        console.log("logged in");
        this.setState({ isLoggedIn: true }); 
      } 
     
    };
  
  render() {
    // if redirect is true then go elsewhere
    if (this.state.redirect) {
      return <Redirect to={this.redirectLocation} />;
    }
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
            <Button variant="primary" type="submit" onClick={this.getNav}>
              Sign-in
            </Button>
          </Form>


        </div>
      </div>
    );
  }

}

export default LoginForm;