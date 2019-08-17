import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from './Component/Navbar';
import Row from 'react-bootstrap/Row';

class Home extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Navbar />
                </Row>
            </Container>
        )
    }

}