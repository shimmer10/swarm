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
import CanvasJSReact from '../assets/canvasjs.react';
import './Report.css';
const CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("customColorSet1",
    [
        "#cc3232", //red
        "#e7b416", //yellow
        "#2dc937", //green
        "#B2BFB6"
    ]);

class Report extends Component {

    state = {
        lowDate: new Date(),
        highDate: new Date(),
        teams: [],
        sessions: [],
        sessionDates: [],
        redTotals: [],
        redTotal: 0,
        yellowTotals: [],
        yellowTotal: 0,
        greenTotals: [],
        greenTotal: 0,
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
    }

    resetPage = () => {
        this.setState({
            lowDate: new Date(),
            highDate: new Date(),
            teamChosen: 0,
            sessions: [],
            sessionDates: [],
            redTotals: [],
            redTotal: 0,
            yellowTotals: [],
            yellowTotal: 0,
            greenTotal: [],
            greenTotal: 0,
            displayReport: false,
            dropdownLabel: "Choose Team"
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
        this.state.sessions.forEach(session => {
            let redCtr = 0;
            let yellowCtr = 0;
            let greenCtr = 0;
            let formatDate = Moment(session.session_date, "YYYY-MM-DD[T]HH:mm:ss").format('YYYY-MM-DD');
            this.state.sessionDates.push(formatDate);
            session.Members.forEach(member => {
                if (member.Status) {
                    if (member.Status.current_status === "RED") {
                        redCtr++;
                        this.state.redTotal++;
                    }
                    else if (member.Status.current_status === "YELLOW") {
                        yellowCtr++;
                        this.state.yellowTotal++;
                    }
                    else {
                        greenCtr++;
                        this.state.greenTotal++;
                    }
                }
            });
            this.state.redTotals.push(redCtr);
            this.state.yellowTotals.push(yellowCtr);
            this.state.greenTotals.push(greenCtr);
        });

        this.setState({
            displayReport: true
        })
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
            let lowDate = Moment(this.state.lowDate).format('YYYY-MM-DD');
            let highDate = Moment(this.state.highDate).format('YYYY-MM-DD');

            const options = {
                animationEnabled: true,
                colorSet: "customColorSet1",
                title: {
                    text: "Team Status " + lowDate + " to " + highDate
                },
                subtitles: [{
                    text: "Scrumblebees",
                    verticalAlign: "center",
                    fontSize: 20,
                    dockInsidePlotArea: true
                }],
                data: [{
                    type: "doughnut",
                    showInLegend: true,
                    indexLabel: "{name}: {y}",
                    yValueFormatString: "#,###",
                    dataPoints: [
                        { name: "Blocked", y: this.state.redTotal }, //red
                        { name: "At Risk", y: this.state.yellowTotal }, //yellow
                        { name: "No Blockers", y: this.state.greenTotal }, //green
                        { name: "Unreported", y: 2 } //grey
                    ]
                }]
            }

            return (
                <Container>
                    <Row>
                        <Col>
                            <CanvasJSChart options={options}
                            /></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="outline-primary" size="lg" className="px-4"
                                onClick={this.resetPage}>Exit</Button>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Report;