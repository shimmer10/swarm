import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
    availableEmployees: [],
    selectedEmployees: [],
    team: {},
    teamName: "",
    updatedEmployeeIds: []
  };

  componentWillMount() {
    this.getTeams();
    this.getEmployees();
    this.setState({
      teamSelected: false,
      selectedEmployees: this.determineSelectedEmployees(),
      availableEmployees: this.determineAvailableEmployees()
    })
  }

  /******************
   * Event Handlers
   ******************/
  handleEmployeeSelect = id => {
    this.state.employees.forEach(employee => {
      if (id === employee.id) {
        employee.TeamId = this.state.team.id;
        this.state.updatedEmployeeIds.push(id);
        this.setState({
          selectedEmployees: this.determineSelectedEmployees(),
          availableEmployees: this.determineAvailableEmployees()
        })
      }
    });
  };

  handleEmployeeDeselect = id => {
    this.state.selectedEmployees.forEach(teamEmployee => {
      if (id === teamEmployee.id) {
        teamEmployee.TeamId = null;
        this.state.updatedEmployeeIds.push(id);
        this.setState({
          selectedEmployees: this.determineSelectedEmployees(),
          availableEmployees: this.determineAvailableEmployees()
        })
      }
    });
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
      teamSelected: true,
      selectedEmployees: this.determineSelectedEmployees(),
      availableEmployees: this.determineAvailableEmployees()
    })
    this.addTeam();
    // this.getTeamByTeamName();  <-- use with select option
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateEmployees();
    this.getTeams();
    this.setState({
      teamSelected: false,
      team: "",
      selectedEmployees: this.determineSelectedEmployees(),
      availableEmployees: this.determineAvailableEmployees()
    })
    // this.addTeam();
    // this.getTeamByTeamName();  <-- use with select option
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.getTeams();
    this.setState({
      teamSelected: false,
      selectedEmployees: this.determineSelectedEmployees(),
      availableEmployees: this.determineAvailableEmployees()
    })
  };

  /********************
   * API Router Calls
   ********************/
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

  updateEmployees = () => {
    let uniqueIdList = Array.from(new Set(this.state.updatedEmployeeIds));
    if (uniqueIdList.length > 0) {
      this.state.employees.forEach(employee => {
        if (uniqueIdList.includes(employee.id)) {
          API.updateEmployee(employee.id, employee)
            .then(res =>
              employee = res.data
            )
            .catch(() =>
              employee = {}
            );
        }
      });
    }
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

  /********************
   * Support Methods
   ********************/
  determineSelectedEmployees = () => {
    let selectedEmployees = [];
    this.state.employees.forEach(employee => {
      if (this.state.team &&
        this.state.team.id === employee.TeamId) {
        selectedEmployees.push(employee);
      }
    });
    return selectedEmployees;
  }

  determineAvailableEmployees = () => {
    let availableEmployees = [];
    this.state.employees.forEach(employee => {
      if (!this.state.team ||
        this.state.team.id !== employee.TeamId) {
        availableEmployees.push(employee);
      }
    });
    return availableEmployees;
  }

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
                <Dropdown xs={5}>
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
              <Col xs={7}>
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
            {this.state.teamName}
          </h2>
          <Container>
            <Row>
              <Col>
                <h4>Employees</h4>
                <p>Click to Add</p>
                <ListGroup>
                  {this.state.availableEmployees.map(availableEmployee => (
                    <ListGroup.Item className="list-item"
                      key={availableEmployee.id}
                      onClick={() => this.handleEmployeeSelect(availableEmployee.id)}>{availableEmployee.last_name}, {availableEmployee.first_name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <h4>Team Members</h4>
                <p>Click to Remove</p>
                <ListGroup>
                  {this.state.selectedEmployees.map(selectedEmployee => (
                    <ListGroup.Item className="list-item"
                      key={selectedEmployee.id}
                      onClick={() => this.handleEmployeeDeselect(selectedEmployee.id)}>{selectedEmployee.last_name}, {selectedEmployee.first_name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col align="center">
                <Button
                  type="button"
                  className="new-btn ml-4"
                  onClick={this.handleSubmit}>Submit</Button>
                <Button
                  type="button"
                  className="new-btn ml-4"
                  onClick={this.handleCancel}>Cancel</Button>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }

}

export default Teams;