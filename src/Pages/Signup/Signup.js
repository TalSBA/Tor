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
import { FaForward } from "react-icons/fa";

function Signup({ activeUser, onSignup, onLogin }) {
  const [userDetails, setUserDetails] = useState("");
  const [calendarDetails, setCalendarDetails] = useState("");
  const [userSignedup, setUserSignedup] = useState(false);
  const [paging, setPaging] = useState(0);

  function getRandomCalendar() {
    return Math.floor(Math.random() * 2) + 1;
  }

  var createUserID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  function handleBackClick() {
    if (paging >= 1) {
      const backToPage = paging - 1;
      setPaging(backToPage);
      // if(backToPage === 0){
      //   setUserDetails(null);
      // }
    }
  }

  function signup(calendarDetails) {
    const userID = createUserID();
    const link = `http://${
      window.location.hostname
    }:${window.location.port}/#/schedule-appointment/${getRandomCalendar()}`;
    setUserDetails(new User({ ...userDetails, id: userID }));
    setCalendarDetails(
      new Calendar({ ...calendarDetails, userId: userID, link: link })
    );
    onSignup(userDetails, calendarDetails);
    onLogin(userDetails, calendarDetails);
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
    <div>
      {userSignedup ? (
        <ConfirmCalendar calendar={calendarDetails} />
      ) : (
        <div className="p-signup">
          <Card className="img_card"></Card>
          <Card className="txt_card">
            {paging >= 1 ? (
              <Button onClick={handleBackClick} className="back-btn">
                <FaForward />
              </Button>
            ) : (
              ""
            )}
            <Card.Body>
              <Card.Text>
                {paging >= 1 ? (
                  <CreateClendar
                    onSubmitCalendarDetails={(calendarDetails) =>
                      signup(calendarDetails)
                    }
                    paging={paging}
                    setPaging={(page) => {
                      setPaging(page);
                    }}
                  />
                ) : paging === 0 ? (
                  <UserDetails
                    onSubmitUserDetails={(userDetails) =>
                      setUserDetails(userDetails)
                    }
                    paging={paging}
                    setPaging={(page) => {
                      setPaging(page);
                    }}
                  />
                ) : (
                  ""
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Signup;
