import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegClock, FaUserClock } from "react-icons/fa";
import "./TimePicker.css";
import { getAvailableHours } from "../../Services/services";

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
function TimePicker({ activityHours, date, onTimeSelected }) {
  const [selectedTime, setSelectedTime] = useState("");
  const [dayHours, setDayHours] = useState("");

  useEffect(() => {
    console.log(hebDay());
    setDayHours(
      activityHours.dayHours.filter((dayHours) => dayHours.day === hebDay())[0]
    );
  }, []);

  const hebDay = () => {
    switch (new Date(date).getDay()) {
      case 0:
        return "א";
        break;
      case 1:
        return "ב";
        break;
      case 2:
        return "ג";
        break;
      case 3:
        return "ד";
        break;
      case 4:
        return "ה";
        break;
      case 5:
        return "ו";
        break;
      case 6:
        return "ש";
        break;
      default:
        return;
        break;
    }
  };

  function timeSelected(e) {
    if (e.target.value === selectedTime) {
      setSelectedTime("");
      onTimeSelected("");
    } else {
      setSelectedTime(e.target.value);
      onTimeSelected(e.target.value);
    }
  }

  return (
    <div className="available-hours">
      <h4>שעות פנויות</h4>
      <h5>
        {date} (יום {hebDay()}')
      </h5>

      <div className="btn-hours">
        {getAvailableHours(date, dayHours.start, dayHours.end).map((hour) => {
          return (
            <Button
              className={`${selectedTime === hour ? "selected-time" : ""}`}
              value={hour}
              onClick={(e) => timeSelected(e)}
            >
              {hour} <FaRegClock />
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default TimePicker;
