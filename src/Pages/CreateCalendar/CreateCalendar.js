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

function CreateCalendar({ onSubmitCalendarDetails }) {
  const [showCreateError, setShowCreateError] = useState(false);
  const [phone, setPhone] = useState("");
  const [bType, setBType] = useState("");
  const [address, setAddress] = useState("");
  const [bName, setBName] = useState("");

  const [services, setServices] = useState([]);
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [modalActivityShow, setModalActivityShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [validated, setValidated] = useState(false);
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

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  // if (!activeUser) {
  //   return <Redirect to="/login" />;
  // }


  function handleCalendarDetails(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      onSubmitCalendarDetails({
        id: ID(),
        name: bName,
        address: address,
        type: bType,
        phone: phone,
        services: services,
        image: selectedImage
          ? selectedImage.src
          : "../ScheduleAppointment/ScheduleAppointment/images/schedule-appointment.jpg",
        activityHours: activityHours,
      });
    }
    setValidated(true);
  }

  function addService(service) {
    setServices(
      services.concat({
        id: ID(),
        name: service.name,
        duration: service.duration,
      })
    );
  }

  function deleteService(serviceId) {
    const newServices = services.filter((service) => service.id != serviceId);
    setServices(newServices);
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
        <Form noValidate validated={validated} onSubmit={handleCalendarDetails}>
          <CalendarDetails
          onNameChange={(name) => setBName(name)}
          onAddressChange={(address) => setAddress(address)}
          onTypeChange={(type) => setBType(type)}
          onPhoneChange={(phone) => setPhone(phone)}
          />
          <BusinessServices
            services={services}
            onAddService={addService}
            onDeleteService={deleteService}
          />
          <p
            className={`validation-error ${
              services.length === 0 ? "display" : ""
            }`}
          >
            אנא הוסף שירות אחד לפחות.
          </p>
          <Button
            className="pic-image-btn tor-btn"
            onClick={() => setModalImagesShow(true)}
          >
            בחר תמונה לעסק
          </Button>
          <BusinessImagesModal
            show={modalImagesShow}
            onHide={() => setModalImagesShow(false)}
            onSubmitImage={(image) => setSelectedImage(image)}
          />
          {selectedImage ? (
            <Image width="150px" height="100px" src={selectedImage.src} />
          ) : (
            ""
          )}
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
            onChangeHours={(activityHours) => setActivityHours(activityHours)}
          />
          {activityHours && activityHoursUpdated
            ? activityHours.dayHours.map((dayHours, index) => {
                return dayHours.active ? (
                  <div key={index}>
                    <label>
                      {dayHours.day} {dayHours.start} - {dayHours.end}
                    </label>
                    <br />
                  </div>
                ) : (
                  ""
                );
              })
            : ""}
          <Button variant="success" type="submit" block>
            <span>הרשם</span>
          </Button>
        </Form>
      )}
    </div>
  );
}

export default CreateCalendar;
