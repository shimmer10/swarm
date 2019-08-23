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
      key: 'People'
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    console.log('selected' + key);
    this.setState({key: key});
    if (key == 'People') {
console.log("in people")
    } else if (key == "Projects") {
console.log("in projects")
    } else {
console.log("in teams")
    };
}
   

      render() {
        return (
        <div align="center">
          
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
            <Tab eventKey="People" title="People">
           
            </Tab>
            <Tab eventKey="Projects" title="Projects">
            
            </Tab>
            <Tab eventKey="Teams" title="Teams">
           
           
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