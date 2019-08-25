import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import API from "../../utils/API";
import CustomToggle from '../../components/CustomToggle';
import CustomMenu from '../../components/CustomMenu';
import TeamForm from '../../components/TeamForm';

import './style.css';

class Teams extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    teamSelected: false,
    teams: [],
    employees: [],
    team: {},
    teamName: "",
  };

  componentDidMount() {
    this.getTeams();
    this.getEmployees();
    this.setState({
      teamSelected: false
    })
  }

  handleEmployeeSelect = id => {
    alert("Added Employee " + id);
    this.addEmployeeToTeam(id);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      teamSelected: true
    })
    this.addTeam();
    // this.getTeamByTeamName();  <-- use with select option
  };

  getTeams = () => {
    API.getTeams()
      .then(res =>
        this.setState({
          teams: res.data
        })
      )
      .catch(() =>
        this.setState({
          teams: []
        })
      );
  };

  addTeam = () => {
    API.addTeam({ team_name: this.state.teamName })
      .then(res =>
        this.setState({
          team: res.data
        })
      )
      .catch(() =>
        this.setState({
          team: []
        })
      );
  };

  addEmployeeToTeam = (id) => {
    this.state.employees.forEach(employee => {
      if (id === employee.id) {
        employee.TeamId = this.state.team.id;
        API.updateEmployee(id, employee)
          .then(res =>
            employee = res.data
          )
          .catch(() =>
            employee = {}
          );
      }
    });
  };

  getEmployees = () => {
    API.getEmployees()
      .then(res =>
        this.setState({
          employees: res.data
        })
      )
      .catch(() =>
        this.setState({
          employees: []
        })
      );
  };

  getTeamByTeamName = () => {
    API.getTeamByTeamName(this.state.teamName)
      .then(res =>
        this.setState({
          team: res.data
        })
      )
      .catch(() =>
        this.setState({
          team: {}
        })
      );
  };

  render() {
    if (!this.state.teamSelected) {
      return (
        <div className="inner-container">
          <h2 align="center" className="header">
            Teams
            </h2>
          <Container>
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    Choose Team
                    </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    {this.state.teams.map(team => (
                      <Dropdown.Item key={team.id}>{team.team_name}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs={9}>
                <TeamForm
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  q={this.state.teamName}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    else {
      return (
        <div className="inner-container">
          <h2 align="center" className="header">
            Teams
            </h2>
          <Container>
            {/* <Row>
              <Col>
                <h1>{this.state.teamName}</h1>
              </Col>
            </Row> */}
            <Row>
              <Col>
                <h4>Employee List (Click to Add)</h4>
                <ListGroup>
                  {this.state.employees.map(employee => (
                    <ListGroup.Item className="list-item"
                      key={employee.id}
                      onClick={() => this.handleEmployeeSelect(employee.id)}>{employee.last_name}, {employee.first_name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <h4>{this.state.teamName}</h4>
                {/* <ListGroup>
                  {this.state.employees.map(employee => (
                    <ListGroup.Item 
                      key={employee.id}
                      onClick={() => this.handleEmployeeSelect(employee.id)}>{employee.last_name}, {employee.first_name}</ListGroup.Item>
                  ))}
                </ListGroup> */}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }

}

export default Teams;