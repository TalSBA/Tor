import React, { useState } from "react";
import { Form, Alert, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ activeUser, users, onLogin }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showInvalidLogin, setShowInvalidLogin] = useState(false);

  if (activeUser) {
    return <Redirect to="/" />;
  }

  function login(e) {
    e.preventDefault();
    let activeUser = null;
    for (const user of users) {
      if (user.login(email, pwd)) {
        activeUser = user;
        break;
      }
    }

    if (activeUser) {
      onLogin(activeUser);
    } else {
      setShowInvalidLogin(true);
    }
  }

  return (
    <div className="p-login">
      <Card>
        <Card.Header>
          {" "}
          <h1>התחבר</h1>
          <p>
            או <Link to="/signup">צור חשבון חדש</Link>
          </p>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {showInvalidLogin ? (
              <Alert variant="danger">שם משתמש או סיסמא לא נכונים!</Alert>
            ) : null}
            <Form onSubmit={login}>
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
                התחבר
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
