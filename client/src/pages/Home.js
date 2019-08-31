import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import './Home.css';
import { cpus } from 'os';

class Home extends Component {

    state = {
        date: new Date(),
        teams: [],
        redirect: false,
        teamChosen: null,
        dropdownLabel: "Choose Team",
        showAlert: false
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

    // handle date selection from date picker
    handleDateSelect = date => this.setState({ date })

    // handle team selection
    handleTeamSelect = teamChosen => {
        this.setState({ teamChosen, dropdownLabel: teamChosen })
    }

    // set redirect to true
    setRedirectToTrue = () => {
        this.setState({
            redirect: true
        })
    }

    // should set redirect to false so they have to hit submit again
    setRedirectToFalse = () => {
        this.setState({
            redirect: false,
            showAlert: true
        })
    }

    // render /sessions on redirect
    renderRedirect = () => {
        var date = this.state.date;
        var teamChosen = this.state.teamChosen;

        if (this.state.redirect) {
            if (teamChosen != null) {

                return <Redirect to={{
                    pathname: '/session',
                    state: {
                        date,
                        teamChosen
                    }
                }} />
            }
            else {
                this.setRedirectToFalse();
            }
        }
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
                                onClick={this.setRedirectToTrue}>Submit</Button>
                        </Col>
                    </Row>
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
            </div>
        )
    }
}

export default Home;