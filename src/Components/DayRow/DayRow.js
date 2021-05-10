import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import DayHours from "../../Model/DayHours";

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

function DayRow({ dayHours, onSelectHours }) {
  //   const [checked, setChecked] = useState(false);
  //   const [start, setStart] = useState("התחלה");
  //   const [end, setEnd] = useState("סיום");

  function onStartChange(e) {
    // setStart(e.target.value);
    onSelectHours({
      day: dayHours.day,
      start: e.target.value,
      end: dayHours.end,
      active: dayHours.active,
    });
  }

  function onEndChange(e) {
    // setEnd(e.target.value);
    onSelectHours({
      day: dayHours.day,
      start: dayHours.start,
      end: e.target.value,
      active: dayHours.active,
    });
  }

  function onCheckedChange(e) {
    onSelectHours(
      new DayHours(dayHours.day, dayHours.start, dayHours.end, !dayHours.active)
    );
  }
  return (
    <Form.Row>
      <Form.Group as={Col} md="3">
        <Form.Label>יום {dayHours.day}</Form.Label>
      </Form.Group>
      <Form.Group as={Col} md="3">
        <Form.Control
          as="select"
          id="start"
          disabled={!dayHours.active}
          value={dayHours.start}
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
          disabled={!dayHours.active}
          value={dayHours.end}
          onChange={onEndChange}
        >
          <option>סיום</option>
          {hours.map((hour) => (
            <option>{hour}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Switch
        checked={dayHours.active}
        onChange={onCheckedChange}
        color="primary"
        name="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </Form.Row>
  );
}

export default DayRow;
