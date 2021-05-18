import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaClock, FaForward, FaMapMarkerAlt } from "react-icons/fa";
import "./ScheduleAppointment.css";
import DatePicker from "../../Components/DatePicker/DatePicker";
import TimePicker from "../../Components/TimePicker/TimePicker";
import ServicePicker from "../../Components/ServicePicker/ServicePicker";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import CustomerDetails from "../../Components/CustomerDetails/CustomerDetails";
import ConfirmAppointment from "../../Components/ConfirmAppointment/ConfirmAppointment";
import { useParams } from "react-router";
import emailjs from "emailjs-com";
// import calendars from "../../data/Calendars.json";

function ScheduleAppointment({ calendars }) {
  const { id } = useParams();
  const [calendar, setCalendar] = useState(null);

  const [paging, setPaging] = useState(1);
  const [selectedTime, setTime] = useState("");
  const [selectedDate, setDate] = useState("");
  const [selectedServices, setServices] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [countTimeSelected, setCountTime] = useState("");
  const [percent, setPercent] = useState(0);
  const [loadText, setLoadText] = useState("בחר שירות");
  const [loadDisabled, setLoadDisabled] = useState(true);

  useEffect(() => {
    console.log("calendars", calendars);
    console.log("id", id);
    console.log(
      "filter",
      calendars.filter((calendar) => calendar.id == id)
    );

    setCalendar(calendars.filter((calendar) => calendar.id == id)[0]);
  }, []);

  function setTextAndPercentByPaging(page) {
    if (page === 2) {
      setPercent(40);
      setLoadText("מתי נוח לך?");
    }
    if (page === 3) {
      setPercent(70);
      setLoadText("שעה?");
    }
    if (page === 4) {
      setPercent(100);
      setLoadText("אז, קבענו?");
    }
  }

  function handleNextClick() {
    if (paging >= 1) {
      const nextPage = paging + 1;
      setPaging(nextPage);
      setTextAndPercentByPaging(nextPage);
      setLoadDisabled(true);
      if (nextPage === 5) {
        sendConfirmEmail();
      }
    }
  }
  function handleBackClick() {
    if (paging > 1) {
      const backToPage = paging - 1;
      setPaging(backToPage);
      setTextAndPercentByPaging(backToPage);
    }
  }
  function setServicesAndCountTime(services, countTime) {
    if (services.length > 0) {
      setPercent(20);
      setLoadText("מעולה, לבחירת זמן >");
      setLoadDisabled(false);
    } else {
      setPercent(0);
      setLoadText("בחר שירות");
      setLoadDisabled(true);
    }
    setServices(services);
    setCountTime(countTime);
  }

  function handleDatePicked(date) {
    setDate(date);
    if (date !== "") {
      setLoadDisabled(false);
    } else {
      setLoadDisabled(true);
    }
  }

  function handleTimePicked(time) {
    setTime(time);
    if (time !== "") {
      setLoadDisabled(false);
    } else {
      setLoadDisabled(true);
    }
  }
  function handleFormValid(isValid) {
    setLoadDisabled(!isValid);
  }
  function newScheduleHandle() {
    setPaging(1);
  }

  function sendConfirmEmail() {
    var emailParams = {
      to_name: customerDetails.firstName,
      to_email: customerDetails.email,
      business_name: calendar.name,
      date: selectedDate,
      time: selectedTime,
      service: selectedServices.map((service) => service.name).join('+'),
    };
    console.log(emailParams);

    emailjs
      .send(
        "service_9clhw4d",
        "template_zcj4pow",
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

  return calendar ? (
    <div className="p-schedule-appointment">
      <Container>
        <Row>
          <div
            className="cover-image"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + calendar.image
              })`,
            }}
          >
            <div className="page-title">
              <h1>{calendar.name}</h1>
              <h2>
                <FaMapMarkerAlt /> {calendar.address}
              </h2>
            </div>
          </div>
        </Row>
        <Row className="details-row">
          <Col className="business-details-container">
            <div className="business-details-item">
              <FaClock />
              <span className="business-time">
                {calendar.activityHours.dayHours.map((dayHour, index) => {
                  return dayHour.active ? (
                    <span key={index}>
                      {dayHour.day} - {dayHour.start} - {dayHour.end} <br />
                    </span>
                  ) : (
                    <span key={index}>
                      {dayHour.day} - סגור <br />
                    </span>
                  );
                })}
              </span>
            </div>
            <div className="business-details-item map">
              <iframe
                className="business-map"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCFMJkJHBOiL9zAis1Af9wJxwCZrA7Smxs&q=${calendar.address}`}
              ></iframe>
            </div>
          </Col>
          <Col className="appointment-details-container">
            <div className="appointment-details">
              {paging > 1 ? (
                <Button onClick={handleBackClick} className="back-btn">
                  <FaForward />
                </Button>
              ) : (
                ""
              )}
              {paging === 1 ? (
                <ServicePicker
                  services={calendar.services}
                  onChange={(services, countTime) =>
                    setServicesAndCountTime(services, countTime)
                  }
                />
              ) : (
                ""
              )}
              {paging === 2 ? (
                <DatePicker onDateSelected={(date) => handleDatePicked(date)} />
              ) : (
                ""
              )}
              {paging === 3 ? (
                <TimePicker
                  activityHours={calendar.activityHours}
                  date={selectedDate}
                  onTimeSelected={(time) => handleTimePicked(time)}
                />
              ) : (
                ""
              )}
              {paging === 4 ? (
                <CustomerDetails
                  validDetails={(valid) => handleFormValid(valid)}
                  setFormData={(customerDetails) =>
                    setCustomerDetails(customerDetails)
                  }
                />
              ) : (
                ""
              )}
              {paging === 5 ? (
                <ConfirmAppointment
                  services={selectedServices}
                  date={selectedDate}
                  time={selectedTime}
                  customerDetails={customerDetails}
                  scheduleNewAppointment={newScheduleHandle}
                />
              ) : (
                ""
              )}
              {/* <Button onClick={handleNextClick} className="next-btn">
              Next
            </Button> */}
              {paging < 5 ? (
                <ProgressBar
                  text={loadText}
                  percent={percent}
                  disabled={loadDisabled}
                  onClick={handleNextClick}
                />
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <div></div>
  );
}

export default ScheduleAppointment;
