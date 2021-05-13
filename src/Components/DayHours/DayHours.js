import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import DayRow from "../DayRow/DayRow";

function DayHours({ activityHours, onSelectHours }) {
  useEffect(() => {
    console.log("activityHours", activityHours.dayHours);
  }, []);
  return (
    <Form className="c-day-hours">
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "א")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "ב")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "ג")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "ד")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "ה")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "ו")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
      <DayRow
        dayHours={
          activityHours.dayHours.filter((dayHours) => dayHours.day === "ש")[0]
        }
        onSelectHours={(dayHours) => onSelectHours(dayHours)}
      />
    </Form>
  );
}

export default DayHours;
