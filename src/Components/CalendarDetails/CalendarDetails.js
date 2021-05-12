import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";

function CalendarDetails({
  onNameChange,
  onAddressChange,
  onTypeChange,
  onPhoneChange,
  calendar,
}) {
  const [phone, setPhone] = useState("");
  const [bType, setBType] = useState("");
  const [address, setAddress] = useState("");
  const [bName, setBName] = useState("");

  useEffect(() => {
    if (calendar) {
     setPhone(calendar.phone);
     setBType(calendar.type);
     setAddress(calendar.address);
     setBType(calendar.name);
    }
  }, []);
  return (
    <div className="c-calendar-details">
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="formBasicEmail">
          <Form.Label>שם העסק</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="שם העסק"
            value={bName}
            onChange={(e) => {
              setBName(e.target.value);
              onNameChange(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            אנא הזן שם עסק.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formBasicEmail">
          <Form.Label>כתובת</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="כתובת"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              onAddressChange(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            אנא הזן כתובת.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="formBasicEmail">
          <Form.Label>תחום</Form.Label>
          <Form.Control
            as="select"
            value={bType}
            onChange={(e) => {
              setBType(e.target.value);
              onTypeChange(e.target.value);
            }}
          >
            <option>מספרה</option>
            <option>קוסמטיקה</option>
            <option>אחר</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="formBasicPassword">
          <Form.Label>טלפון</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="טלפון"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              onPhoneChange(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            אנא הזן טלפון.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </div>
  );
}

export default CalendarDetails;
