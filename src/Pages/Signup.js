import React, { useState } from "react";
import { Card, Form, Alert, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import User from "../Model/User";
import "../Styles/Signup.css";

function Signup({ activeUser, onLogin }) {
  const [showSignupError, setShowsignupError] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName, setName] = useState("");

  if (activeUser) {
    return <Redirect to="/" />;
  }

  function signup(e) {
    //TODO: validation code
    const activeUser = new User(fullName, email);
    console.log(activeUser);
    onLogin(activeUser);
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
            <Form onSubmit={signup}>
              <Form.Group controlId="formBasicFullName">
                <Form.Label>שם מלא</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="שם מלא"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>אימייל</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="הזן אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>סיסמא</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="סיסמא"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
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
