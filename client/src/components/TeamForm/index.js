import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './style.css';

function Form({ q, handleInputChange, handleFormSubmit }) {
  return (
    <Container>
      <Row>
        <Col className="form-button">
          <Button
            type="button"
            className="new-btn ml-4"
            onClick={handleFormSubmit}>New Team</Button>
        </Col>
        <Col>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                id="team-name"
                type="text"
                value={q}
                placeholder="Team Name"
                name="teamName"
                onChange={handleInputChange}
                required
              />
              {/* <Button
          type="button"
          className="new-btn ml-4"
          onClick={handleFormSubmit}>New Team</Button> */}
            </div>

          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Form;
