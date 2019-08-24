import React, { Component } from 'react';
import API from "../utils/API";
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';

class Home extends Component {
    state = {
        date: new Date(),
        teams: []
    }

    componentWillMount(){
        this.getTeams();
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
                            <Dropdown.Item>{team.team_name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <DatePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
            </div>
        )
    }
}

export default Home;