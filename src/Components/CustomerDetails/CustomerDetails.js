import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import "./CustomerDetails.css";

function CustomerDetails({ validDetails, setFormData }) {
  const [validated, setValidated] = useState(false);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const handleChange = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      validDetails(false);
    } else {
      setFormData({
        firstName: fName,
        lastName: lName,
        phone: phone,
        email: email,
        comments: comments,
      });
      validDetails(true);
    }
    setValidated(true);
  };
  return (
    <div className="c-customer-details">
      <h4>מלא את הפרטים הבאים</h4>
      <Form noValidate validated={validated} onChange={handleChange}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="שם פרטי"
              value={fName}
              onChange={(e) => setfName(e.target.value)}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="שם משפחה"
              value={lName}
              onChange={(e) => setlName(e.target.value)}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>טלפון</Form.Label>
            <Form.Control
              type="text"
              placeholder="טלפון"
              aria-describedby="inputGroupPrepend"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <Form.Control.Feedback></Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>אימייל</Form.Label>
            <Form.Control
              type="email"
              placeholder="אימייל"
              aria-describedby="inputGroupPrepend"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInputCapture={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="validationCustom05">
            <Form.Label>הערות</Form.Label>
            <Form.Control
              type="text"
              placeholder="הערות"
              aria-describedby="inputGroupPrepend"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        {/* <Button type="submit">Submit form</Button> */}
      </Form>
    </div>
  );
}

export default CustomerDetails;
