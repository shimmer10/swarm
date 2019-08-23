import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
//import Navbar from './Component/Navbar';
import Row from 'react-bootstrap/Row';
import People from '../components/People';
import Projects from '../components/Projects';
import Teams from '../components/Teams';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './Admin.css';


class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPeople: true,
      isProjects: false,
      isTeams: false
    };
  }

  showPeople() {
    this.setState({isPeople: true, isProjects: false, isTeams: false});
  }

  showProjects() {
    this.setState({isProjects: true, isPeople: false, isTeams: false});
  }
   
  showTeams() {
    this.setState({isTeams: true, isPeople: false, isProjects: false});
  }
   

      render() {
        return (
        <div align="center">
          
          <Tabs defaultActiveKey="People" id="uncontrolled-tab-example">
            <Tab eventKey="People" title="People">
            <div
              className={"controller " + (this.state.isPeople
                ? "selected-controller"
                : "")}
                onClick={this
                .showPeople
                .bind(this)}>
                People
            </div>
            </Tab>
            <Tab eventKey="Projects" title="Projects">
            <div
            className={"controller " + (this.state.isProjects
              ? "selected-controller"
              : "")}
              onClick={this
              .showProjects
              .bind(this)}>
              Projects
            </div>
            </Tab>
            <Tab eventKey="Teams" title="Teams">
            <div
            className={"controller " + (this.state.isTeams
              ? "selected-controller"
              : "")}
              onClick={this
              .showTeams
              .bind(this)}>
              Teams
            </div>
           
            </Tab>
          </Tabs>
         
          <div className="box-container" align="left">
            {this.state.isPeople && <People/>}
            {this.state.isProjects && <Projects/>}
            {this.state.isTeams && <Teams/>}
          </div>
         </div> 

        )
      }
    };     


export default Admin;