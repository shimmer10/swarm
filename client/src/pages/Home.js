import React, { Component } from 'react';
import API from "../utils/API";
import Button from 'react-bootstrap/Button';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';

class Home extends Component {
    state = {
        date: new Date(),
        teams: []
    }

    componentWillMount() {
        this.getTeams();
    }

    componentDidMount() {
        console.log(sessionStorage)
        if (sessionStorage.getItem("userID") == undefined) {
            console.log("no user ID in session");
            // prevent user from going to this page
            this.props.history.push({
                pathname: "/",
            })
        }

    }


    onChange = date => this.setState({ date })

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

    render() {
        console.log("teams: " + JSON.stringify(this.state.teams));
        return (
            <div>
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
                <DatePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <Button variant="outline-primary">Submit</Button>
            </div>
        )
    }
}

export default Home;