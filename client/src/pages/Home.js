import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <img src={require('../images/SWARMLogo.png')} alt="SWARM Logo"/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;