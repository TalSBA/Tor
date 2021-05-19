import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { GrFormPrevious } from "react-icons/gr";

function CalendarDetails({
  calendar,
  onSubmitCalendarDetails,
  onNameChange,
  onAddressChange,
  onTypeChange,
  onPhoneChange,
}) {
  const [phone, setPhone] = useState("");
  const [bType, setBType] = useState("");
  const [address, setAddress] = useState("");
  const [bName, setBName] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (calendar) {
      setPhone(calendar.phone);
      setBType(calendar.type);
      setAddress(calendar.address);
      setBName(calendar.name);
    }
  }, []);

  function handleCalendarDetails(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onSubmitCalendarDetails({
        name: bName,
        address: address,
        type: bType,
        phone: phone,
      });
    }
    setValidated(true);
  }

  return (
    <div className="c-calendar-details">
      <Form noValidate validated={validated} onSubmit={handleCalendarDetails}>
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
                if(onNameChange) {onNameChange(e.target.value)};
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
                if(onAddressChange) {onAddressChange(e.target.value)};
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
                if(onTypeChange) {onTypeChange(e.target.value)};
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
                if(onPhoneChange) {onPhoneChange(e.target.value)};
              }}
            />
            <Form.Control.Feedback type="invalid">
              אנא הזן טלפון.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {!calendar ? (
          <Button className="btn-next" variant="success" type="submit" block>
            הבא <GrFormPrevious />
          </Button>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
}

export default CalendarDetails;
