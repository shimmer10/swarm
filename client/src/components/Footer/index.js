import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import "./style.css";

function Footer() {
    return (
        <Navbar id="footer" expand="lg" bg="dark" variant="dark">
            <p>Copyright &copy; 2019 Scrumblebees</p>
        </Navbar>
    );
}

export default Footer;