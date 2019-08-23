import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

//import './style.css';

class Teams extends Component {

    constructor(props) {
        super(props);
        this.state = {};
      }
    
      addTeam(e) {}
      updateTeam(e){}
      deleteTeam(e) {}

      render() {
        return (
          <div className="inner-container">
            <h2 align="center" className="header">
              Teams
            </h2>
            <div className="box">
    
          <ButtonToolbar> 
          <Button
            type="button"
            className="add-btn"
            onClick={this
            .addTeam
            .bind(this)}>Add</Button>
            <Button
            type="button"
            className="update-btn"
            onClick={this
            .updateTeam
            .bind(this)}>Update</Button>
            <Button
            type="button"
            className="add-btn"
            onClick={this
            .deleteTeam
            .bind(this)}>Delete</Button>
            </ButtonToolbar> 
        </div>
      </div>
    );
  }

}

export default Teams;