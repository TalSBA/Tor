import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import DayRow from "./DayRow";
import "../Styles/ActivityModal.css";

function ActivityHoursModal({ show, onHide, onUpdate }) {
  const [activityHours, setActivityHours] = useState([]);

  function updateHours(dayHours) {
    console.log(activityHours);

    var index = activityHours.findIndex((x) => x.day === dayHours.day);
    if (index === -1) {
      setActivityHours([...activityHours, dayHours]);
    } else {
      console.log(activityHours);
      const newActivityHours = [...activityHours];
      console.log("newActivityHours", newActivityHours);
      newActivityHours[index] = {...dayHours};
      setActivityHours(newActivityHours);
    }
  }
  return (
    <div>
      <Modal show={show} onHide={onHide} className="c-hours-modal">
        <Modal.Header>עדכון שעות פעילות</Modal.Header>
        <Modal.Body className="show-grid">
          <Form>
            <DayRow
              day={"א"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              day={"ב"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              day={"ג"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              day={"ד"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              day={"ה"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              day={"ו"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              day={"ש"}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onUpdate(activityHours)}>עדכן</Button>
          <Button onClick={onHide}>סגור</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActivityHoursModal;
