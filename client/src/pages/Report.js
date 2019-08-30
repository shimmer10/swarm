import React, { Component } from 'react';
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Moment from 'moment';

import './Report.css';

class Report extends Component {
    state = {
        lowDate: new Date(),
        highDate: new Date(),
        teams: [],
        sessions: [],
        sessionDates: [],
        redTotals: [],
        yellowTotals: [],
        greenTotals: [],
        displayReport: false,
        teamChosen: 0,
        dropdownLabel: "Choose Team"
    }

    componentDidMount() {
        this.getTeams();
        if (sessionStorage.getItem("userID") === undefined) {
            console.log("no user ID in session");
            // prevent user from going to this page
            this.props.history.push({
                pathname: "/",
            })
        }
    }

    /******************
     * Event Handlers
     ******************/
    handleLowDateSelect = lowDate => this.setState({ lowDate })

    handleHighDateSelect = highDate => this.setState({ highDate })

    handleTeamSelect = teamChosen => {
        this.setState({ teamChosen, dropdownLabel: teamChosen })
    }

    displayReport = () => {
        this.getSessions();
        // this.determineCounts();
        // this.setState({
        //     displayReport: true
        // }
        // , () => {
        //     console.log(JSON.stringify(this.state.sessions));
        //     this.determineCounts();
        // }
        // );
    }

    resetPage = () => {
        this.setState({
            lowDate: new Date(),
            highDate: new Date(),
            teamChosen: 0,
            sessions: [],
            sessionDates: [],
            redTotals: [],
            yellowTotals: [],
            greenTotal: [],
            displayReport: false
        })
    }

    /*********************
     * API Router Calls
     *********************/
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

    getSessions = () => {
        var lowDate = Moment(this.state.lowDate).format('YYYY-MM-DD');
        var highDate = Moment(this.state.highDate).format('YYYY-MM-DD');
        API.getSessionByTeamNameAndDateRange(this.state.teamChosen, lowDate, highDate)
            .then(res => {
                this.setState({
                    sessions: res.data
                    // displayReport: true
                })
                console.log("<debug> calling determineCounts");
                this.determineCounts();
            }
            )
            .catch(() =>
                this.setState({
                    sessions: []
                })
            );
    };

    /**
     * Support Methods
     */
    determineCounts = () => {
        let dateList = [];
        let redList = [];
        let yellowList = [];
        let greenList = [];
        this.state.sessions.forEach(session => {
            let redCtr = 0;
            let yellowCtr = 0;
            let greenCtr = 0;
            dateList.push(session.session_date);
            session.Members.forEach(member => {
                if (member.Status) {
                    if (member.Status.current_status === "RED") {
                        redCtr++;
                    }
                    else if (member.Status.current_status === "YELLOW") {
                        yellowCtr++;
                    }
                    else {
                        greenCtr++;
                    }
                }
            });
            redList.push(redCtr);
            yellowList.push(yellowCtr);
            greenList.push(greenCtr);
        });

        this.setState({
            sessionDates: dateList,
            redTotals: redList,
            yellowTotals: yellowList,
            greenTotals: greenList,
            displayReport: true
        })
        console.log("<debug> leaving determineCounts");
    }

    render() {
        if (!this.state.displayReport) {
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
                                onClick={this.displayReport}>Submit</Button>
                        </Col>
                    </Row>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <h1>Main Diagram</h1>
                            {/* <p>{JSON.stringify(this.state.sessions)}</p> */}
                            <p>{this.state.sessionDates}</p>
                            <p>{this.state.redTotals}</p>
                            <p>{this.state.yellowTotals}</p>
                            <p>{this.state.greenTotals}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>Daily Diagrams</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="outline-primary" size="lg" className="px-4"
                                onClick={this.resetPage}>Exit</Button>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Report;