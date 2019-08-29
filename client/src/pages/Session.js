import React, { Component } from 'react';
import API from "../utils/API";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Moment from 'moment';
import './Session.css';

class Session extends Component {
    state = {
        members: [],
        date: "",
        teamChosen: "",
        status: ""
    }

    componentDidMount() {
        if (undefined === this.props.location.state) {
            console.log("no team/date selected to render session");
            // prevent user from going to this page without info from /home
            this.props.history.push({
                pathname: "/",
            })
        }
        else {
            this.setState({ date: this.props.location.state.date });
            this.setState({ teamChosen: this.props.location.state.teamChosen });
            this.getSession(this.props.location.state.teamChosen, this.props.location.state.date);
        }
    }

    // get teams from db
    getSession = (teamName, date) => {
        var formattedDate = Moment(date).format('YYYY-MM-DD');
        API.getSessionByTeamNameAndDate(teamName, formattedDate)
            .then(res =>
                this.setState({
                    members: res.data.Members
                })
            )
            .catch(() =>
                this.setState({
                    teams: []
                })
            );

    };

    // handle status selection
    handleStatusSelect(event){
        var status = event.target.value;
        this.setState({ status })
        console.log("status: " + status);
    }

    render() {
        return (
            <div>
                <Container id="container">
                    <Row>
                        <Col size="md-12">
                            {this.state.members.map(member => (
                                <CardDeck id="card-deck">
                                    <Card key={member.id} id="employee-card">
                                        <Card.Img variant="top" src={member.image_link} />
                                        <Card.Body>
                                            <Card.Title>{member.first_name} {member.last_name}</Card.Title>
                                            <Form>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Doing</Form.Label>
                                                    <Form.Control as="textarea" rows="3" placeholder="What are you doing today?" />
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Done</Form.Label>
                                                    <Form.Control as="textarea" rows="3" placeholder="What did you do yesterday?" />
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Status</Form.Label>
                                                    <Form.Control as="select" onChange={this.handleStatusSelect.bind(this)}>
                                                        <option value="blocked">Blocked</option>
                                                        <option value="impeded">Impeded</option>
                                                        <option value="clear">Clear</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </CardDeck>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Session;