import React, { Component } from 'react';
import Footer from '../components/Footer';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Hometwo.css';

class Hometwo extends Component {

    render() {
        return (
            <div>
                <Container id="container">
                    <Row fluid>
                        <Col size="md-12">
                            <h1>Congrats on a successful signin/signup</h1>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Hometwo;