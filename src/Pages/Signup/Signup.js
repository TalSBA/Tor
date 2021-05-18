import React, { useState } from "react";
import { Card, Form, Button, Row, Container, Col } from "react-bootstrap";
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

    sendConfirmEmail(calendarDetails, link);
  }

  function sendConfirmEmail(calendarDetails, link) {
    var emailParams = {
      to_name: userDetails.fullName,
      to_email: userDetails.email,
      // business_name: calendarDetails.name,
      // Schedule_Appointment_Link: link,
      message: `יומן חדש נוצר עבור העסק: ${calendarDetails.name}.\n על מנת לאפשר ללקוחות לקבוע תור יש להשתמש בלינק הבא: ${link}`,
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
    <Container>
      {userSignedup ? (
        <ConfirmCalendar calendar={calendarDetails} />
      ) : (
        <div className="p-signup">
          <Card className="img_card"></Card>
          <Card className="txt_card">
            <Card.Body>
              <Card.Text>
                <h1>ברוכים הבאים לתור!</h1>
                <p className="subtitle">אנא מלא את הפרטים הבאים</p>
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
      )}
    </Container>
  );
}

export default Signup;
