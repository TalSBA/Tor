import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import DayRow from "./DayRow";
import "../Styles/ActivityModal.css";
import DayHours from "../Model/DayHours";

function ActivityHoursModal({ activityHours, show, onHide, onUpdate, onChangeHours }) {
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
    const newActivityHours = {...activityHours};
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
          <Form>
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "א"
              )[0]}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "ב"
              )[0]}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "ג"
              )[0]}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "ד"
              )[0]}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "ה"
              )[0]}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "ו"
              )[0]}
              onSelectHours={(dayHours) => updateHours(dayHours)}
            />
            <DayRow
              dayHours={activityHours.dayHours.filter(
                (dayHours) => dayHours.day === "ש"
              )[0]}
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
