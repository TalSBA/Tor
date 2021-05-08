import React from "react";
import { Form } from "react-bootstrap";

const availableHours = [
  "08:00",
  "08:30",
  "09:00",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];
function TimePicker(props) {
  return (
    <div className="available-hours">
      <h4>בחר שעה רצויה:</h4>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control as="select">
            {availableHours.map((hour) => {
              return <option>{hour}</option>;
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
}

export default TimePicker;
