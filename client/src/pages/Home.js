import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import con from "../utils/const";
import './Home.css';

class Home extends Component {
    state = {
        date: new Date(),
        teams: [],
        redirect: false,
        LoggedIn: true,  // set the default to true
        teamChosen: null,
        dropdownLabel: "Choose Team"
    }

    componentDidMount() {
        this.getTeams();
        console.log(sessionStorage)
        if (!sessionStorage.getItem("userID")) {
            console.log("no user ID in home");
            this.props.updateWhichNav(con.NOUSER);
            // prevent user from going to this page
            this.setState({
                LoggedIn: false
            })
        } else if (sessionStorage.getItem("role") === 'Scrum Master') {
            console.log("returning nav admin from home");
            console.log(sessionStorage.getItem("userID"));
            this.props.updateWhichNav(con.ADMIN);
            this.setState({
                LoggedIn: true
            })
        } else {
            console.log("returning nav developer from home");
            console.log(sessionStorage.getItem("userID"));
            this.props.updateWhichNav(con.DEVELOPER);
            this.setState({
                LoggedIn: true
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
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    setStateToFalse = () => this.setState({ redirect: false })

    // render / or /sessions on redirect
    renderRedirect = () => {
        var date = this.state.date;
        var teamChosen = this.state.teamChosen;

        // if we arent logged in protect this page by redirecting to main page at /
        if (!this.state.LoggedIn) {
            console.log('redirecting to main from home');
            return <Redirect to="/" />;
        }

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
                alert("Please Choose a Team");
                this.setStateToFalse();
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
                                onClick={this.setRedirect}>Submit</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;

