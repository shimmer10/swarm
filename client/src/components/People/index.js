import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
import CustomToggle from '../../components/CustomToggle';
import CustomMenu from '../../components/CustomMenu';
import TeamForm from '../../components/TeamForm';

import './style.css';

class People extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    employeeSelected: false,
    employees: [],
    availableEmployees: [],
    selectedEmployees: [],
    updatedEmployeeIds: [],
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    role: '',
  };

  componentDidMount() {
    this.getEmployees();
    this.setState({
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
        this.setState({
          employeeSelected: true,
          id: employee.id,
          firstName: employee.first_name,
          lastName: employee.last_name,
          email: employee.email,
          image: employee.image_link,
          role: employee.role,
          selectedEmployees: this.determineSelectedEmployees(),
          availableEmployees: this.determineAvailableEmployees()
        })
      }
    });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState({
      employeeSelected: false,
      selectedEmployees: this.determineSelectedEmployees(),
      availableEmployees: this.determineAvailableEmployees()
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      role: this.state.role,
      email: this.state.email,
      image_link: this.state.image_link,
    }
    API.updateEmployee(this.state.id, data)
      .then(res => {
        console.log(res.data);
        this.getEmployees();   // refresh the employee information
        this.setState({
          employeeSelected: false,
          selectedEmployees: this.determineSelectedEmployees(),
          availableEmployees: this.determineAvailableEmployees()
        })
      })
      .catch(err => {
        alert("People Page: update employee error: " + err);
        console.log("in catch for handle submit in people page");
        console.log(err);
      });
  }

  handleDelete = (event) => {
    event.preventDefault();

    API.deleteEmployee(this.state.id)
      .then(res => {
        console.log(res.data);
        this.getEmployees();
        this.setState({
          employeeSelected: false,
          selectedEmployees: this.determineSelectedEmployees(),
          availableEmployees: this.determineAvailableEmployees(),
        })
      })
      .catch(err => {
        alert("People Page: delete employee error: " + err);
        console.log("in catch for handle delete on people page");
        console.log(err);
      });
  }


  /********************
   * API Router Calls
   ********************/
  getEmployees = () => {
    API.getEmployees()
      .then(res =>
        this.setState({
          employees: res.data
        })
      )
      .catch(err => {
        alert("People Page: get employee error: " + err);
        this.setState({
          employees: []
        })
      });
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

  handleInputChange = event => {
    console.log('handle input change on people page: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }




  render() {

    if (!this.state.employeeSelected) {
      return (
        <div className="inner-container">
          <h2 align="center" className="header">
            Select an employee to edit profile
        </h2>
          <Container>
            <Row>
              <Col>
                <h4>Employees</h4>
                <p>Click to Edit</p>
                <ListGroup>
                  {this.state.employees.map(employee => (
                    <ListGroup.Item className="list-item"
                      key={employee.id}
                      onClick={() => this.handleEmployeeSelect(employee.id)}>{employee.last_name}, {employee.first_name}</ListGroup.Item>
                  ))}
                </ListGroup>
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
            Editing: {this.state.firstName} {this.state.lastName} Information
          </h2>
          <Container>
            <Row>
              <Col>
                <h4>Employees</h4>
                <p>Click to Edit</p>
                <ListGroup>
                  {this.state.employees.map(employee => (
                    <ListGroup.Item className="list-item"
                      key={employee.id}
                      onClick={() => this.handleEmployeeSelect(employee.id)}>{employee.last_name}, {employee.first_name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <h4>Employee Info</h4>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridfirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="firstname" name="firstname" placeholder={this.state.firstName} onChange={this.handleInputChange} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="lastname" name="lastname" placeholder={this.state.lastName} onChange={this.handleInputChange} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder={this.state.email} onChange={this.handleInputChange} />
                  </Form.Group>

                  {/* <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
                  </Form.Group> */}
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridImage">
                    <Form.Label>Image Link</Form.Label>
                    <Form.Control type="image" name="image" placeholder={this.state.image} onChange={this.handleInputChange} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" name="role" onChange={this.handleInputChange}>
                      <option>{this.state.role}</option>
                      <option>Developer</option>
                      <option>Scrum Master</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
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
                <Button
                  type="button"
                  className="new-btn ml-4"
                  onClick={this.handleDelete}>Delete Employee</Button>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default People;