import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ConfirmCalendar.css";

function ConfirmCalendar({ calendar }) {
  useEffect(() => {
    console.log(calendar);
  }, []);

  function getRandomCalendar() {
    return Math.floor(Math.random() * 2) + 1;
  }

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
                  href={`http://${window.location.hostname}:3000/#/schedule-appointment/${(getRandomCalendar())}`}
                  target="_blank"
                >
                  http://{window.location.hostname}:3000/#/schedule-appointment/
                  {getRandomCalendar()}
                </a>
              </div>
              <Link to="/">
                {" "}
                <Button>לעמוד הבית</Button>
              </Link>
              <Link to="/calendar">
                {" "}
                <Button>ליומן שלי</Button>
              </Link>
            </center>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ConfirmCalendar;
