import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomToggle from '../components/CustomToggle';
import CustomMenu from '../components/CustomMenu';

class Home extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        Custom toggle
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Orange
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
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