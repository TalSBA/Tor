import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaClock, FaForward, FaMapMarkerAlt } from "react-icons/fa";
import "./ScheduleAppointment.css";
import DatePicker from "../../Components/DatePicker/DatePicker";
import TimePicker from "../../Components/TimePicker/TimePicker";
import ServicePicker from "../../Components/ServicePicker/ServicePicker";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import CustomerDetails from "../../Components/CustomerDetails/CustomerDetails";
import ConfirmAppointment from "../../Components/ConfirmAppointment/ConfirmAppointment";

function ScheduleAppointment(props) {
  const [paging, setPaging] = useState(1);
  const [selectedTime, setTime] = useState("");
  const [selectedDate, setDate] = useState("");
  const [selectedServices, setServices] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [countTimeSelected, setCountTime] = useState("");
  const [percent, setPercent] = useState(0);
  const [loadText, setLoadText] = useState("בחר שירות");
  const [loadDisabled, setLoadDisabled] = useState(true);

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
  return (
    <div className="p-schedule-appointment">
      <Container>
        <Row>
          <div className="cover-image">
            <div className="page-title">
              <h1>טל</h1>
              <h2>
                <FaMapMarkerAlt /> רחוב הארבעה 5, תל אביב יפו
              </h2>
            </div>
          </div>
        </Row>
        <Row className="details-row">
          <Col className="business-details-container">
            <div className="business-details-item">
              <FaClock />
              <span className="business-time">
                ראשון - 08:00 - 17:00
                <br />
                שני - 08:00 - 16:30
                <br />
                רביעי - 09:00 - 18:00
                <br />
              </span>
            </div>
            <div className="business-details-item map">
              <iframe
                className="business-map"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCFMJkJHBOiL9zAis1Af9wJxwCZrA7Smxs&q=${"הארבעה 5 תל אביב"}`}
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
                <TimePicker onTimeSelected={(time) => handleTimePicked(time)} />
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
  );
}

export default ScheduleAppointment;
