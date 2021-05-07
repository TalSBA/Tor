import React from "react";
import { Card } from "react-bootstrap";
import "../Styles/ConfirmCalendar.css";

function ConfirmCalendar({ calendar }) {
  return (
    <div className="p-confirm-calendar">
      <Card>
        <Card.Header>
          <img width="350" height="200" src={calendar?.image} />
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <center>
              <div
                style={{
                  paddingBottom: "19px",
                  fontSize: "30px",
                  color: "darkorange",
                }}
              >
                {" "}
                מזל טוב!{" "}
              </div>
              <div style={{ paddingBottom: "10px", fontSize: "24px" }}>
                {calendar.name}{" "}
              </div>
              <div style={{ fontSize: "18px" }}>
                יומן העסק שלך נוצר בהצלחה!
                <br />
                מעכשיו הלקוחות שלך יוכלו לקבוע תורים בעצמם דרך הלינק הבא:
                <br />
                <a
                  href="http://localhost:3000/?#/scheduale-appointment/0"
                  target="_blank"
                >
                  http://localhost:3000/?#/scheduale-appointment/0
                </a>
              </div>
            </center>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ConfirmCalendar;
