import React from "react";
import { Redirect } from "react-router";

function CreateCalendar({ activeUser }) {
  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <h1>Create Calendar</h1>
    </div>
  );
}

export default CreateCalendar;
