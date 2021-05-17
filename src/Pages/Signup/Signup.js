import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router";
import User from "../../Model/User";
import "./Signup.css";
import UserDetails from "../../Components/UserDetails/UserDetails";
import CreateClendar from "../CreateCalendar/CreateCalendar";
import Calendar from "../../Model/Calendar";
import ConfirmCalendar from "../ConfirmCalendar/ConfirmCalendar";
import emailjs from "emailjs-com";

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
    const link = `http://${window.location.hostname}:3000/#/schedule-appointment/${userID}`;
    setUserDetails(new User({ ...userDetails, id: userID }));
    setCalendarDetails(
      new Calendar({ ...calendarDetails, userId: userID, link: link })
    );
    // console.log(userDetails);
    // console.log(calendarDetails);
    onSignup(userDetails, calendarDetails);
    onLogin(userDetails);
    setUserSignedup(true);

    sendConfirmEmail(link);
  }

  function sendConfirmEmail(link) {
    var emailParams = {
      to_name: userDetails.fullName,
      to_email: userDetails.email,
      business_name: calendarDetails.name,
      Schedule_Appointment_Link: link,
    };

    emailjs
      .send(
        "service_9clhw4d",
        "template_ixt7yze",
        emailParams,
        "user_QYNrz7Ys24SE8mSosxVfW"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
