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
    
}
   

      render() {
        return (
        <div align="center">
         <div className="box-container" align="left">
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
            <Tab eventKey="People" title="People">
            <People />
            </Tab>
            <Tab eventKey="Projects" title="Projects">
            <Projects />
            </Tab>
            <Tab eventKey="Teams" title="Teams">
           <Teams />
           
            </Tab>
          </Tabs>
         
          </div> 
         </div> 

        )
      }
    };     


export default Admin;