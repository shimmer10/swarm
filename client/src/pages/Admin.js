import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import People from '../components/People';
import Projects from '../components/Projects';
import Teams from '../components/Teams';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import con from "../utils/const";
import './Admin.css';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 'People',
      allowAccess: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    console.log(sessionStorage);
    if (sessionStorage.getItem("role") === 'Scrum Master') {
      // allow access to admin page if role is scrum master
      console.log("admin page: user role is scrum master");
      this.props.updateWhichNav(con.ADMIN);
      this.setState({
        allowAccess: true
      })
    } else {
      // else no access to admin page at all
      this.setState({
        allowAccess: false
      })
    }
  }

  handleSelect(key) {
    console.log('selected' + key);
    this.setState({ key: key });

  }
  // render / on redirect
  renderRedirect = () => {
    // if we arent logged in protect this page by redirecting to main page at /
    if (!this.state.allowAccess) {
      console.log('redirecting to main from admin');
      return <Redirect to="/" />;
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}

        <div align="center">
          <div className="box-container" align="left">
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
              <Tab eventKey="People" title="People">
                <People />
              </Tab>
              <Tab eventKey="Teams" title="Teams">
                <Teams />

              </Tab>
            </Tabs>

          </div>
        </div>
      </div>
    )
  }
};

export default Admin;