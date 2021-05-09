import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
function TimePicker({ onTimeSelected }) {
  const [selectedTime, setSelectedTime] = useState("");

  function timeSelected(e) {
    if (e.target.value === selectedTime) {
      setSelectedTime("");
    } else {
      setSelectedTime(e.target.value);
      onTimeSelected(e.target.value);
    }
  }

  return (
    <div className="available-hours">
      <h4>שעות פנויות</h4>
      <div>
        {availableHours.map((hour) => {
          return (
            <Button
              className={`${selectedTime === hour ? "selected-time" : ""}`}
              value={hour}
              onClick={(e) => timeSelected(e)}
            >
              {hour}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TimePicker;
