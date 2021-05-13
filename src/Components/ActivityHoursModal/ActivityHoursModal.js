import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import DayHours from "../DayHours/DayHours";
import DayRow from "../DayRow/DayRow";
import "./ActivityHoursModal.css";

function ActivityHoursModal({
  activityHours,
  show,
  onHide,
  onUpdate,
  onChangeHours,
}) {
  //   const [activityHours, setActivityHours] = useState([]);

  useEffect(() => {
    console.log(activityHours);
  }, []);

  function updateHours(dayHours) {
    console.log(dayHours);
    var index = activityHours.dayHours.findIndex((x) => x.day === dayHours.day);
    // if (index === -1) {
    //   //   setActivityHours([...activityHours, dayHours]);
    //   const newActivityHours = [...activityHours.dayHours];
    //   onUpdate([...newActivityHours, dayHours]);
    // } else {
    const newActivityHours = { ...activityHours };
    newActivityHours.dayHours[index] = dayHours;
    //   setActivityHours(newActivityHours);
    onChangeHours(newActivityHours);
    // }
    console.log(activityHours);
  }
  return (
    <div>
      <Modal show={show} onHide={onHide} className="c-hours-modal">
        <Modal.Header>עדכון שעות פעילות</Modal.Header>
        <Modal.Body className="show-grid">
          <DayHours
            activityHours={activityHours}
            onSelectHours={(dayHours) => updateHours(dayHours)}
          />
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
