import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './Report.css';

class Report extends Component {
    state = {
        lowDate: new Date(),
        highDate: new Date(),
        teams: [],
        displayReport: false,
        teamChosen: 0,
        dropdownLabel: "Choose Team"
    }

    componentDidMount() {
        this.getTeams();
        console.log(sessionStorage)
        if (sessionStorage.getItem("userID") === undefined) {
            console.log("no user ID in session");
            // prevent user from going to this page
            this.props.history.push({
                pathname: "/",
            })
        }
    }

    // get teams from db
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

    // handle low date selection from date picker
    handleLowDateSelect = lowDate => this.setState({ lowDate })

    // handle high date selection from date picker
    handleHighDateSelect = highDate => this.setState({ highDate })

    // handle team selection
    handleTeamSelect = teamChosen => {
        this.setState({ teamChosen, dropdownLabel: teamChosen })
    }

    // set displayReport to true
    setDisplayReport = () => {
        this.setState({
            displayReport: true
        })
        alert("Team: " + this.state.teamChosen + " Low Date: " + this.state.lowDate + " High Date: " + this.state.highDate);
    }

    // render /sessions on redirect
    // renderRedirect = () => {
    //     var date = this.state.date;
    //     var teamChosen = this.state.teamChosen;
    //     if (this.state.redirect) {
    //         return <Redirect to={{
    //             pathname: '/session',
    //             state: {
    //                 date,
    //                 teamChosen
    //             }
    //         }} />
    //     }
    // }

    render() {
        return (
            <Container>
                <Row className="team-dropdown mt-2 pt-2">
                    <Col xs={2}>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {this.state.dropdownLabel}
                            </Dropdown.Toggle>
                            <Dropdown.Menu as={CustomMenu}>
                                {this.state.teams.map(team => (
                                    <Dropdown.Item key={team.id}
                                        onClick={() => this.handleTeamSelect(team.team_name)}>{team.team_name}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={2} id="start-label">
                        <p>Start Date</p>
                    </Col>
                    <Col xs={2} id="start-date">
                        <DatePicker
                            onChange={this.handleLowDateSelect}
                            value={this.state.lowDate}
                        />
                    </Col>
                    <Col xs={2} id="end-label">
                        <p>End Date</p>
                    </Col>
                    <Col xs={2} id="end-date">
                        <DatePicker
                            onChange={this.handleHighDateSelect}
                            value={this.state.highDate}
                        />
                    </Col>
                    <Col xs={2} id="submit-button">
                        <Button variant="outline-primary" size="lg" className="px-4"
                            onClick={this.setDisplayReport}>Submit</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Report;