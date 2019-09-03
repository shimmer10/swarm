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
import { FaPlusCircle } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import FormStatus from '../components/FormStatus';
import Moment from 'moment';
import Row from 'react-bootstrap/Row';
import './Home.css';

class Home extends Component {

    state = {
        date: new Date(),
        dropdownLabel: "Choose Team",
        members: [],
        memberStatus: [],
        teams: [],
        loggedIn: true,
        teamChosen: null,
        teams: [],
        showAlert: false,
        status: "choose status",
        submitted: false,
        today: "",
        yesterday: ""
    }

    componentDidMount() {
        this.getTeams();
        console.log(sessionStorage)
        if (sessionStorage.getItem("role") === 'Developer') {
            console.log("returning nav developer from home");
            console.log(sessionStorage.getItem("userID"));
            this.props.updateWhichNav(con.DEVELOPER);
            this.setState({
                loggedIn: true
            })
        } else if (sessionStorage.getItem("role") === 'Scrum Master') {
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

        console.log("date: " + this.state.date);
        console.log("team chosen: " + teamChosen);
        if (teamChosen != null) {
            this.setState({
                submitted: true,
                showAlert: false
            })
            console.log("state submitted: " + this.state.submitted);
        }
        else {
            this.setState({
                showAlert: true
            });
        }
    }

    getSession = (teamName, date) => {
        var formattedDate = Moment(date, " YYYY-MM-DD[T]HH:mm:ss").format('YYYY-MM-DD');
        console.log("session date: " + formattedDate);
        API.getSessionByTeamNameAndDate(teamName, formattedDate)
            .then(res =>
                this.setState({
                    members: res.data.Members,
                    date: formattedDate
                },
                    this.getSession(this.state.teamChosen, this.state.date)
                )
            )
            .catch(() =>
                this.setState({
                    members: []
                })
            );
    };

    getStatus = (id) => {
        API.getStatusByMemberId(id)
            .then(res =>
                this.setState({
                    memberStatus: res.data.Statuses
                }))
            .catch(() =>
                this.setState({
                    memberStatus: []
                }))

    }

    addStatus = () => {
        console.log("adding status");
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Container>
                    <Row id="select-row" className="justify-content-md-center">
                        <Col md="auto" className="columns">
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
                        <DatePicker
                            onChange={this.handleDateSelect}
                            value={this.state.date}
                        />
                        <Col xs lg="2" className="columns">
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
                                            <Card key={member.id} id="employee-card" fluid>
                                                <Card.Img variant="top" rounded />
                                                <Card.Body>
                                                    <Card.Title>{member.first_name} {member.last_name}</Card.Title>
                                                    {/* <div onClick={this.addStatus}> */}
                                                    <FaPlusCircle id="plus" size={25} onClick={this.addStatus} />
                                                    {/* </div> */}
                                                    {/* {this.getStatus(member.id)} */}
                                                    <Form>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Doing</Form.Label>
                                                            <Form.Control as="textarea" rows="3" placeholder="What are you doing today?" onChange={todayStatus => this.setState({ today: todayStatus })} />
                                                            {/* {this.state.memberStatus.today_description} */}
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Done</Form.Label>
                                                            <Form.Control as="textarea" rows="3" placeholder="What did you do yesterday?" />
                                                            {/* {this.state.memberStatus.yesterday_description} */}
                                                        </Form.Group>
                                                        <FormStatus />
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