import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import con from "../utils/const";
import './Main.css';

class Main extends Component {
    state = {
        date: new Date(),
        teams: [],
        redirect: false,
        teamChosen: null,
        dropdownLabel: "Choose Team"
    }
    componentDidMount() {
        if (!sessionStorage.getItem("userID")) {
            console.log("MAIN: no user ID in session");
            this.props.updateWhichNav(con.NOUSER);
        } else if (sessionStorage.getItem("role") === 'SCRUM MASTER') {
            console.log("MAIN: returning nav admin from main");
            this.props.updateWhichNav(con.ADMIN);
        } else {
            console.log("MAIN: returning nav developer from main");
            this.props.updateWhichNav(con.DEVELOPER);
        }
    }

    render() {
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col size="md-12">
                            <Image id="main-logo" src={require('../images/SWARMLogo.png')} alt="SWARM Logo" fluid />
                        </Col>
                    </Row>
                    <Row fluid>
                        <Col size="md-12" id="header-text">
                            <h1>Welcome To SWARM</h1>
                            <h5>Standup With A Remote Motif</h5>
                        </Col>
                    </Row>
                    <Row fluid>
                        <Col size="md-2">

                        </Col>
                        <Col size="md-8" id="home-text">

                            <div id="main-section">
                                <br />
                                <h4>Our goal is to help relieve the struggles of working with members from long
                                    distances while still following agile practices.
                            </h4>
                                <h4>We want to help solve the remote daily standup conundrum!</h4>
                                <h4>
                                    <Link className="ml-auto" id="login" to="/loginscreen">Sign up </Link>
                                    today to start having improved standups!
                            </h4>
                            </div>
                        </Col>
                        <Col size="md-2">

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Main;