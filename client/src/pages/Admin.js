import React, { Component } from 'react';
import People from '../components/People';
import Projects from '../components/Projects';
import Teams from '../components/Teams';
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

  componentDidMount() {
    console.log(sessionStorage)
    if (sessionStorage.getItem("role") !== 'Scrum Master') {
      console.log("user role is not admin in session");
      // prevent user from going to this page
      this.props.history.push({
        pathname: "/",
      })
    }

  }

  handleSelect(key) {
    console.log('selected' + key);
    this.setState({ key: key });

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