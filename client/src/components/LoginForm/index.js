import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/";
import Button from "react-bootstrap";
//import './style.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
      }
    
      submitLogin(e) {}

      render() {
        return (
          <div className="inner-container">
            <h2 align="center" className="header">
              Sign-in
            </h2>
            <div className="box">
    
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className="login-input"
                  placeholder="Username"/>
              </div>
              <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
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