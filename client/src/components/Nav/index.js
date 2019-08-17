import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
// import './style.css';

class Nav extends Component {

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
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <NavDropdown title="Developers" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="https://bethgrogg.github.io/Portfolio/">Bethany</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="https://brendath.github.io/">Brenda</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="https://shimmer10.github.io/Bootstrap-Portfolio/">Jenn</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="https://spbryan.github.io/Bootstrap-Portfolio/">Sean</NavDropdown.Item>
                    </NavDropdown>

                    {/* <Nav className="mr-auto">
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <Nav.Link href="#features">Sign-In/Sign-Up</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Nav;