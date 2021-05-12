import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import User from "../../Model/User";
import "./Signup.css";
import UserDetails from "../../Components/UserDetails/UserDetails";
import CreateClendar from "../CreateCalendar/CreateCalendar";
import Calendar from "../../Model/Calendar";
import ConfirmCalendar from "../ConfirmCalendar/ConfirmCalendar";

function Signup({ activeUser, onSignup, onLogin }) {
  const [userDetails, setUserDetails] = useState("");
  const [calendarDetails, setCalendarDetails] = useState("");
  const [userSignedup, setUserSignedup] = useState(false);

  var createUserID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  // if (activeUser) {
  //   return <Redirect to="/" />;
  // }

  function signup(calendarDetails) {
    const userID = createUserID();
    setUserDetails(new User({ ...userDetails, id: userID }));
    setCalendarDetails(new Calendar({ ...calendarDetails, userId: userID }));
    console.log(userDetails);
    console.log(calendarDetails);
    onSignup(userDetails, calendarDetails);
    onLogin(userDetails);
    setUserSignedup(true);
  }

  return (
    <div className="p-signup">
      {userSignedup ? (
        <ConfirmCalendar calendar={calendarDetails} />
      ) : (
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
      )}
    </div>
  );
}

export default Signup;
