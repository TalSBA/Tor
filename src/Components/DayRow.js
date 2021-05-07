import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

const hours = [
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

function DayRow({ day, onSelectHours }) {
  const [checked, setChecked] = useState(false);
  const [start, setStart] = useState("התחלה");
  const [end, setEnd] = useState("סיום");


  function onStartChange(e) {
    setStart(e.target.value);
    onSelectHours({ day: day, start: e.target.value, end: end });
  }

  function onEndChange(e) {
    setEnd(e.target.value);
    onSelectHours({ day: day, start: start, end: e.target.value });
  }
  return (
    <Form.Row>
      <Form.Group as={Col} md="3">
        <Form.Label>יום {day}</Form.Label>
      </Form.Group>
      <Form.Group as={Col} md="3">
        <Form.Control
          as="select"
          id="start"
          disabled={!checked}
          value={start}
          onChange={onStartChange}
        >
          <option>התחלה</option>
          {hours.map((hour) => (
            <option>{hour}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} md="3">
        <Form.Control
          as="select"
          id="end"
          disabled={!checked}
          value={end}
          onChange={onEndChange}
        >
          <option>סיום</option>
          {hours.map((hour) => (
            <option>{hour}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Switch
        checked={checked}
        onChange={() => setChecked(!checked)}
        color="primary"
        name="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </Form.Row>
  );
}

export default DayRow;
