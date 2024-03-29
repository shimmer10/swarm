import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import con from "../../utils/const";
// import './style.css';

class NavBarDeveloper extends Component {

    state = {
        open: false,
        width: window.innerWidth,
    };

    // called when logout button is selected
    // this clears the session storage which is
    // what we use to indicate a user is logged in
    handleLogOut = props => {
        console.log(sessionStorage)
        sessionStorage.clear();
        this.props.updateWhichNav(con.NOUSER);
    }

    updateWidth = () => {
        const newState = { width: window.innerWidth };

        if (this.state.open && newState.width < 991) {
            newState.open = false
        }

        this.setState(newState);
    };

    toggleNav = () => {
        this.setState({ open: !this.state.open });
    };

    componentDidMount() {
        window.addEventListener("resize", this.updateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth);
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Navbar.Brand href="/">
                            <img
                                src={require('../../images/transparent_beehive.png')}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="SWARM"
                            />
                        </Navbar.Brand>
                        <NavDropdown title="Developers" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="https://bethgrogg.github.io/Portfolio/" target="_blank">Bethany</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://brendath.github.io/" target="_blank">Brenda</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://shimmer10.github.io/Bootstrap-Portfolio/" target="_blank">Jenn</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://spbryan.github.io/Bootstrap-Portfolio/" target="_blank">Sean</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} id="home" to="/home">
                        Home
                    </NavLink>
                    <NavLink className="ml-auto" activeStyle={{ fontWeight: "bold", textDecoration: "underline" }} id="report" to="/report">
                        Report
                    </NavLink>
                    <NavLink onClick={this.handleLogOut} className="ml-auto" id="logout" to="/">
                        Logout for {this.props.devName}
                    </NavLink>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default NavBarDeveloper;
