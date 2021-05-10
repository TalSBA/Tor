import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import "./CustomerDetails.css";

function CustomerDetails({ validDetails }) {
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      validDetails(false);
    } else {
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
            <Form.Control required type="text" placeholder="שם פרטי" />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control required type="text" placeholder="שם משפחה" />
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
            />
          </Form.Group>
        </Form.Row>
        {/* <Button type="submit">Submit form</Button> */}
      </Form>
    </div>
  );
}

export default CustomerDetails;
