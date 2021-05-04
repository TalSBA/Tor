import React from "react";
import { Redirect } from "react-router";


function Calendar({ activeUser }) {
  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
}

export default Calendar;
