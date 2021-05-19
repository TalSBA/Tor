import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Card, Form, Alert, Button, Image, Col } from "react-bootstrap";
import "./CreateCalendar.css";
import BusinessServices from "../../Components/BusinessServices/BusinessServices";
import BusinessImagesModal from "../../Components/BusinessImagesModal/BusinessImagesModal";
import ConfirmCalendar from "../ConfirmCalendar/ConfirmCalendar";
import ActivityHoursModal from "../../Components/ActivityHoursModal/ActivityHoursModal";
import ActivityHours from "../../Model/ActivityHours";
import DayHours from "../../Model/DayHours";
import { createCalendarService } from "../../Services/services";
import CalendarDetails from "../../Components/CalendarDetails/CalendarDetails";
import { GrFormPrevious } from "react-icons/gr";
import { FaForward } from "react-icons/fa";

function CreateCalendar({ onSubmitCalendarDetails, paging, setPaging }) {
  const [showCreateError, setShowCreateError] = useState(false);
  const [calendarDetails, setCalendarDetails] = useState("");

  const [services, setServices] = useState([]);
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [modalActivityShow, setModalActivityShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [calendar, setCalendar] = useState(null);
  const [activityHours, setActivityHours] = useState(
    new ActivityHours([
      { day: "א", start: "התחלה", end: "סיום", active: false },
      { day: "ב", start: "התחלה", end: "סיום", active: false },
      { day: "ג", start: "התחלה", end: "סיום", active: false },
      { day: "ד", start: "התחלה", end: "סיום", active: false },
      { day: "ה", start: "התחלה", end: "סיום", active: false },
      { day: "ו", start: "התחלה", end: "סיום", active: false },
      { day: "ש", start: "התחלה", end: "סיום", active: false },
    ])
  );
  const [activityHoursUpdated, setActivityHoursUpdated] = useState(null);
  // const [paging, setPaging] = useState(1);

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  // if (!activeUser) {
  //   return <Redirect to="/login" />;
  // }

  function handleNextClick() {
    if (paging >= 1) {
      const nextPage = paging + 1;
      setPaging(nextPage);
      console.log(nextPage);
    }
  }
  // function handleBackClick() {
  //   if (paging > 1) {
  //     const backToPage = paging - 1;
  //     setPaging(backToPage);
  //   }
  // }

  function handleCreatedCalendar(event) {
    onSubmitCalendarDetails({
      id: ID(),
      name: calendarDetails.bName,
      address: calendarDetails.address,
      type: calendarDetails.bType,
      phone: calendarDetails.phone,
      services: services,
      image: selectedImage
        ? selectedImage.src
        : "../ScheduleAppointment/ScheduleAppointment/images/schedule-appointment.jpg",
      activityHours: activityHours,
    });
  }

  function handleCalendarDetails(calendarDetails) {
    setCalendarDetails(calendarDetails);
    handleNextClick();
  }

  function handleServices(services) {
    setServices(services);
    handleNextClick();
  }
  function handleImage(image) {
    setSelectedImage(image);
    handleNextClick();
  }

  function updateActivityHours(hours) {
    setActivityHoursUpdated(hours);
    setModalActivityShow(false);
  }

  return (
    <div className="p-create-calendar">
      {calendar ? (
        <ConfirmCalendar
          calendar={calendar}
          calendarId={createCalendarService(calendar)}
        />
      ) : (
        <div>
          {/* <Form
            noValidate
            validated={validated}
            onSubmit={handleCreatedCalendar}
          > */}
          {paging === 1 ? (
            <CalendarDetails
              onSubmitCalendarDetails={(calendarDetails) =>
                handleCalendarDetails(calendarDetails)
              }
            />
          ) : (
            ""
          )}
          {paging === 2 ? (
            <div>
              <BusinessServices
                services={services}
                onSubmitServices={(services) => handleServices(services)}
              />
            </div>
          ) : (
            ""
          )}
          {paging === 3 ? (
            <div>
              <Button
                className="pic-image-btn tor-btn"
                onClick={() => setModalImagesShow(true)}
              >
                בחר תמונה לעסק
              </Button>
              <BusinessImagesModal
                show={modalImagesShow}
                onHide={() => setModalImagesShow(false)}
                onSubmitImage={(image) => handleImage(image)}
              />
            </div>
          ) : (
            ""
          )}
          {paging === 4 ? (
            <div>
              <Button
                className="pic-image-btn tor-btn"
                onClick={() => setModalActivityShow(true)}
              >
                עדכן שעות פעילות
              </Button>
              <ActivityHoursModal
                activityHours={activityHours}
                show={modalActivityShow}
                onHide={() => setModalActivityShow(false)}
                onUpdate={(activityHours) => {
                  updateActivityHours(activityHours);
                }}
                onChangeHours={(activityHours) =>
                  setActivityHours(activityHours)
                }
                onSubmitActivityHours={() => handleCreatedCalendar()}
              />
              {activityHours
                ? activityHours.dayHours.map((dayHours, index) => {
                    return (
                      <div key={index}>
                        <label>
                          {dayHours.day} {dayHours.start} - {dayHours.end}
                        </label>
                        <br />
                      </div>
                    );
                  })
                : ""}
            </div>
          ) : (
            ""
          )}
          {paging === 5 ? (
            <Button variant="success" type="submit" block>
              <span>הרשם</span>
            </Button>
          ) : (
            ""
            // <Button
            //   variant="success"
            //   className="btn-next"
            //   onClick={handleNextClick}
            // >
            //   <span>
            //     הבא <GrFormPrevious />
            //   </span>
            // </Button>
          )}
          {/* </Form> */}
        </div>
      )}
    </div>
  );
}

export default CreateCalendar;
