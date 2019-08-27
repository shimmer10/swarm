import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import "./style.css";

function Footer() {
    return (
        <Navbar id="footer" className="fixed-bottom" expand="lg" bg="dark" variant="dark">
            <Container>
                <NavbarBrand id="copyright">Copyright &copy; 2019 Scrumblebees</NavbarBrand>
            </Container>
        </Navbar>
    );
}

export default Footer;