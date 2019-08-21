import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
// import './style.css';

class NavBar extends Component {

    state = {
        open: false,
        width: window.innerWidth
    };

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
                            <NavDropdown.Item href="https://bethgrogg.github.io/Portfolio/">Bethany</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://brendath.github.io/">Brenda</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://shimmer10.github.io/Bootstrap-Portfolio/">Jenn</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://spbryan.github.io/Bootstrap-Portfolio/">Sean</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Link className="ml-auto" id="login" to="/loginscreen">
                        Sign-in/Sign-up
                    </Link>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default NavBar;