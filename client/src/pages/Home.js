import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';

class Home extends Component {
    state = {
        date: new Date(),
        teams: [],
        redirect: false,
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

    // render /sessions on redirect
    renderRedirect = () => {
        var date = this.state.date;
        var teamChosen = this.state.teamChosen;
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/session',
                state: {
                    date,
                    teamChosen
                }
            }} />
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
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
                <DatePicker
                    onChange={this.handleDateSelect}
                    value={this.state.date}
                />
                <Button variant="outline-primary" size="lg" className="px-4"
                    onClick={this.setRedirect}>Submit</Button>
            </div>
        )
    }
}

export default Home;