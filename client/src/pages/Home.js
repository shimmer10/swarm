import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Home extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <h1>Home</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;