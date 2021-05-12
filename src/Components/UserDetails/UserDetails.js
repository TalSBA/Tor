import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import "./UserDetails.css";

function UserDetails({ onSubmitUserDetails, activeUser }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName, setName] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setEmail(activeUser.email);
      setName(activeUser.fullName);
      setPwd(activeUser.passwod);
    }
  }, []);

  function handleUserDetails(event) {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSubmitUserDetails({ fullName: fullName, email: email, password: pwd });
    }
    setValidated(true);
  }
  return (
    <Form
      className="c-user-details"
      noValidate
      validated={validated}
      onSubmit={handleUserDetails}
    >
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
      {activeUser ? (
        <Button className="btn-save" type="submit" block>
          <FaCheckCircle /> שמירת הגדרות
        </Button>
      ) : (
        <Button variant="success" type="submit" block>
          הבא <GrFormPrevious />
        </Button>
      )}
    </Form>
  );
}

export default UserDetails;
