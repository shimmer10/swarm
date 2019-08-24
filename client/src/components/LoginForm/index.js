import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
// import Form from "react-bootstrap/";
// import Button from "react-bootstrap";
//import './style.css';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
        // all is good now go home
        // window.location.href = '/home';
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
          Sign-in
            </h2>
        <div className="box">

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="email"
              className="login-input"
              placeholder="Email" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this.handleInputChange}
              name="password"
              className="login-input"
              placeholder="Password"/>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
              .submitLogin
              .bind(this)}>Sign-in</button>
        </div>
      </div>
    );
  }

}

export default LoginForm;