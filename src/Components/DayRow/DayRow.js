import { Switch } from "@material-ui/core";
import { Filter } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
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
  const [startHours, setStartHours] = useState(hours);
  const [endHours, setEndHours] = useState(hours);

  function onStartChange(e) {
    onSelectHours({
      day: dayHours.day,
      start: e.target.value,
      end: dayHours.end,
      active: dayHours.active,
    });
    let newEndHours = [...endHours];
    setEndHours(newEndHours.filter((hour) => hour > e.target.value));
  }

  function onEndChange(e) {
    onSelectHours({
      day: dayHours.day,
      start: dayHours.start,
      end: e.target.value,
      active: dayHours.active,
    });
  }

  function onCheckedChange(e) {
    onSelectHours({
      day: dayHours.day,
      start: dayHours.start,
      end: dayHours.end,
      active: !dayHours.active,
    });
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
          {startHours.map((hour) => (
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
          {endHours.map((hour) => (
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
