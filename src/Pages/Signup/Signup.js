import React, { useState } from "react";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import User from "../../Model/User";
import "./Signup.css";

function Signup({ activeUser, onSignup, onLogin }) {
  const [showSignupError, setShowsignupError] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName, setName] = useState("");
  const [validated, setValidated] = useState(false);

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  if (activeUser) {
    return <Redirect to="/" />;
  }

  function signup(event) {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const activeUser = new User({id: ID(), fullName: fullName, email: email, password: pwd});
      console.log(activeUser);
      onSignup(activeUser);
      onLogin(activeUser);
    }
    setValidated(true);
  }
  return (
    <div className="p-signup">
      <Card>
        <Card.Header>
          {" "}
          <h1>ברוכים הבאים לתור!</h1>
          <p>אנא מלא את הפרטים הבאים</p>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {showSignupError ? (
              <Alert variant="danger">אחד הפרטים לא תקינים!</Alert>
            ) : null}
            <Form noValidate validated={validated} onSubmit={signup}>
              <Form.Group controlId="formBasicFullName">
                <Form.Label>שם מלא</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="שם מלא"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  אנא הזן שם מלא.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>אימייל</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="הזן אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  אנא הזן אימייל חוקי.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>סיסמא</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="סיסמא"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  אנא הזן סיסמא.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit" block>
                הרשם
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
