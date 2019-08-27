import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Session.css';

class Session extends Component {
    state = {
        date: "",
        teamChosen: ""
    }

    componentDidMount() {
        if (this.state.date === undefined || this.state.teamChosen === undefined) {
            console.log("no team/date selected to render session");
            // prevent user from going to this page without info from /home
            this.props.history.push({
                pathname: "/",
            })
        }
        else {
            this.setState({ date: this.props.location.state.date });
            this.setState({ teamChosen: this.props.location.state.teamChosen })
        }
    }

    render() {
        console.log("date in session: " + this.state.date);
        console.log("teamChosen in session: " + this.state.teamChosen);
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col size="md-12">
                            <h1>sessions</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Session;