import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

function ConfirmAppointment({ services, date, time, scheduleNewAppointment }) {
  useEffect(() => {
    console.log("services", services);
  }, []);
  return (
    <div className="confirm-appointment">
      <h4>התור ממתין לאישור העסק</h4>
      <p>
        <span> תור ל</span>{" "}
        {services.map((service) => service.name).join(" + ")}
      </p>
      <p>
        <span> בתאריך</span>{" "}
        {date}
      </p>
      <p>
        <span> בשעה</span>{" "}
        {time}
      </p>
      <Button onClick={scheduleNewAppointment}>קבע תור נוסף</Button>
    </div>
  );
}

export default ConfirmAppointment;
