import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import User from "../../Model/User";
import "./Signup.css";
import UserDetails from "../../Components/UserDetails/UserDetails";
import CreateClendar from "../CreateCalendar/CreateCalendar";
import Calendar from "../../Model/Calendar";

function Signup({ activeUser, onSignup, onLogin }) {
  const [userDetails, setUserDetails] = useState("");
  const [calendarDetails, setCalendarDetails] = useState("");

  var createUserID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  if (activeUser) {
    return <Redirect to="/" />;
  }

  function signup(calendarDetails) {
    const userID = createUserID();
    const activeUser = new User({...userDetails, id: userID});
    const calendar = new Calendar({...calendarDetails, userId: userID});
    console.log(activeUser);
    console.log(calendar);
    onSignup(activeUser, calendar);
    onLogin(activeUser);
  }
  return (
    <div className="p-signup">
      <Card>
        <Card.Header>
          {" "}
          <h1>ברוכים הבאים לתור!</h1>
          <p>אנא מלא את הפרטים הבאים</p>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {userDetails ? (
              <CreateClendar
                onSubmitCalendarDetails={(calendarDetails) =>
                  signup(calendarDetails)
                }
              />
            ) : (
              <UserDetails
                onSubmitUserDetails={(userDetails) =>
                  setUserDetails(userDetails)
                }
              />
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
