import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from "../utils/API";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import con from "../utils/const";
import Container from 'react-bootstrap/Container';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormStatus from '../components/FormStatus';
import Moment from 'moment';
import Row from 'react-bootstrap/Row';
import './Home.css';

class Home extends Component {

    state = {
        blockerDescription: null,
        date: new Date(),
        dropdownLabel: "Choose Team",
        members: [],
        loggedIn: true,
        teamChosen: null,
        teams: [],
        showAlert: false,
        status: null,
        submitted: false,
        today: null,
        yesterday: null
    }

    componentDidMount() {
        this.getTeams();
        console.log(sessionStorage)
        if (sessionStorage.getItem("role") === 'DEVELOPER') {
            console.log("returning nav developer from home");
            console.log(sessionStorage.getItem("userID"));
            this.props.updateWhichNav(con.DEVELOPER);
            this.setState({
                loggedIn: true
            })
        } else if (sessionStorage.getItem("role") === 'SCRUM MASTER') {
            console.log("returning nav admin from home");
            console.log(sessionStorage.getItem("userID"));
            this.props.updateWhichNav(con.ADMIN);
            this.setState({
                loggedIn: true
            })
        } else {
            console.log("no user ID in home");
            this.props.updateWhichNav(con.NOUSER);
            this.setState({
                loggedIn: false
            })
            // prevent user from going to this page
        }
    }

    renderRedirect = () => {
        if (!this.state.loggedIn) {
            return <Redirect to="/" />;
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

    // handle date selection from date picker
    handleDateSelect = date => this.setState({ date })

    // handle team selection
    handleTeamSelect = teamChosen => {
        this.setState({ teamChosen, dropdownLabel: teamChosen })
    }

    // set submitted to true if team chosen
    renderCardsOnSubmit = () => {
        var teamChosen = this.state.teamChosen;

        if (teamChosen != null) {
            this.setState({
                submitted: true,
                showAlert: false
            })
            var sessionsRendered = 0;
            this.getSession(teamChosen, this.state.date, sessionsRendered);
        }
        else {
            this.setState({
                showAlert: true
            });
        }
    }

    // get session from API
    getSession = (teamName, date, sessionsRendered) => {
        var formattedDate = Moment(date, " YYYY-MM-DD[T]HH:mm:ss").format('YYYY-MM-DD');
        sessionsRendered++;
        API.getSessionByTeamNameAndDate(teamName, formattedDate)
            .then(res =>
                this.setState({
                    members: res.data.Members,
                },
                    this.verifySessionNeeded(teamName, date, sessionsRendered)
                )
            )
            .catch(() =>
                this.setState({
                    members: []
                })
            );
    };

    // render session only twice to pick up new sessions
    verifySessionNeeded = (teamName, date, sessionsRendered) => {
        if (sessionsRendered < 2) {
            this.getSession(teamName, date, sessionsRendered);
        }
    };

    // add status to db
    addStatus = (id) => {
        const request = {
            current_status: this.state.status,
            yesterday_description: this.state.yesterday,
            today_description: this.state.today,
            blocker_description: this.state.blockerDescription,
            MemberId: id
        }

        API.addStatus(request)
            .then(res =>
                console.log(res)
            )
            .catch(err => {
                alert("Error updating status: " + err);
            });

            this.setState({
                blocker_description: null
            })

        this.getSession(this.state.teamChosen, this.state.date, 0);
    }

    // handle change of yesterday & today fields
    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // grab status and blocker value from FormStatus
    update(value) {
        if (value === "RED" || value === "YELLOW" || value === "GREEN") {
            this.setState({
                status: value
            });
        }
        else {
            this.setState({
                blockerDescription: value
            });
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Container>
                    <Row id="select-row" className="justify-content-md-center">
                        <Col md="auto" className="columns" id="team-select">
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
                        <Col id="date-pick">
                            <DatePicker
                                onChange={this.handleDateSelect}
                                value={this.state.date}
                            />
                        </Col>
                        <Col xs lg="2" className="columns" id="submit-button">
                            <Button variant="outline-primary" size="lg" className="px-4"
                                onClick={this.renderCardsOnSubmit}>Submit</Button>
                        </Col>
                    </Row>
                    {/* Alert when no team chosen */}
                    {this.state.showAlert === true &&
                        (<Row>
                            <Col xs lg="12">
                                <Alert id="alert" variant="danger" onClose={() => this.setState({ showAlert: false })} dismissible>
                                    <Alert.Heading>No Team Provided</Alert.Heading>
                                    <p>
                                        A team is required. Please select a team and submit again
                                </p>
                                </Alert>
                            </Col>
                        </Row>
                        )}
                </Container>
                {/* Render team member cards */}
                {this.state.submitted === true && (
                    <div id="divider">
                        <Container id="container">
                            <Row>
                                <Col size="md-12">
                                    <CardDeck id="card-deck">
                                        {this.state.members.map(member => (
                                            <Card key={member.id} id="employee-card" fluid="true" >
                                                <Card.Img variant="top" rounded="true" />
                                                <Card.Body>
                                                    <Card.Title id="card-name">{member.first_name} {member.last_name}</Card.Title>
                                                    <Form>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label className="card-label">Doing</Form.Label>
                                                            {member.Status
                                                                ? <h6 id="doing-val">{member.Status.today_description}</h6>
                                                                : <Form.Control as="textarea" rows="3" name="today" placeholder="What are you doing today?" onChange={this.handleInputChange} />
                                                            }
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label className="card-label">Done</Form.Label>
                                                            {member.Status
                                                                ? <h6 id="done-val">{member.Status.yesterday_description}</h6>
                                                                : <Form.Control as="textarea" rows="3" name="yesterday" placeholder="What did you do yesterday?" onChange={this.handleInputChange} />
                                                            }
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            {member.Status
                                                                ? (<div><Form.Label className="card-label">Blocker</Form.Label> <h6 id="block-val">{member.Status.blocker_description}</h6></div>)
                                                                : <FormStatus data={this.update.bind(this)} />
                                                            }
                                                        </Form.Group>
                                                        {member.Status === null && (
                                                            <Button onClick={() => this.addStatus(member.id)}>Submit</Button>
                                                        )}
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </CardDeck>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </div>
        )
    }
}

export default Home;

