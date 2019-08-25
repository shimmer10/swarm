import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import API from "../../utils/API";
import CustomToggle from '../../components/CustomToggle';
import CustomMenu from '../../components/CustomMenu';
import TeamForm from '../../components/TeamForm';

//import './style.css';

class Teams extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    teamSelected: false,
    teams: [],
    teamName: "",
  };

  componentDidMount() {
    this.getTeams();
    this.setState({
      teamSelected: false
    })
  }

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

  // addTeam(e) { }
  // updateTeam(e) { }
  // deleteTeam(e) { }

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
            <Row>
              <Col>
                <h1>{this.state.teamName}</h1>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }

}

export default Teams;