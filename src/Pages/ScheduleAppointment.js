import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FaBackward, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "../Styles/ScheduleAppointment.css";
import DatePicker from "../Components/DatePicker";
import TimePicker from "../Components/TimePicker";
import ServicePicker from "../Components/ServicePicker";
import ProgressBar from "../Components/ProgressBar";

function ScheduleAppointment(props) {
  const [paging, setPaging] = useState(1);
  const [selectedTime, setTime] = useState("");
  const [selectedDate, setDate] = useState("");
  const [selectedServices, setServices] = useState("");
  const [countTimeSelected, setCountTime] = useState("");
  const [percent, setPercent] = useState(0);
  const [loadText, setLoadText] = useState("בחר שירות");


  function setTextAndPercentByPaging(page){
    if(page === 2){
      setPercent(40);
      setLoadText("מתי נוח לך?");
    }
    if(page === 3){
      setPercent(70);
      setLoadText("שעה?");
    }
  }

  function handleNextClick() {
    if (paging >= 1) {
      const nextPage = paging + 1;
      setPaging(nextPage);
      setTextAndPercentByPaging(nextPage);
    }
  }
  function handleBackClick() {
    if (paging > 1) {
      const backToPage = paging - 1;
      setPaging(backToPage);
      setTextAndPercentByPaging(backToPage);
    }
  }
  function setServicesAndCountTime(services, countTime){
    console.log(services.length);
    if(services.length > 0){
      setPercent(20);
      setLoadText("מעולה, לבחירת זמן >")
    }
    else{
      setPercent(0);
      setLoadText("בחר שירות")
    }
    setServices(services);
    setCountTime(countTime);
  }
  return (
    <div className="p-schedule-appointment">
      <div className="cover-image">
        <div className="page-title">
          <h1>טל</h1>
          <h2>
            <FaMapMarkerAlt /> רחוב הארבעה 5, תל אביב יפו
          </h2>
        </div>
      </div>
      <Container>
        <aside className="page-details">
          <div className="page-details-item rtl-right">
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
          <div className="page-details-item rtl-right map">
            <iframe
              className="business-map"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCFMJkJHBOiL9zAis1Af9wJxwCZrA7Smxs&q=${"הארבעה 5 תל אביב"}`}
            ></iframe>
          </div>
        </aside>
        <section>
          <div className="appointment-details-container">
            {paging > 1 ? (
              <Button onClick={handleBackClick} className="back-btn">
                <span>Back </span>
                <FaBackward />
              </Button>
            ) : (
              ""
            )}
            {paging === 1 ? <ServicePicker onChange={(services, countTime) => setServicesAndCountTime(services, countTime)}/> : ""}
            {paging === 2 ? <DatePicker onDateSelected={(date) => setDate(date)}/> : ""}
            {paging === 3 ? <TimePicker onTimeSelected={(time) => setTime(time)} /> : ""}
            {/* <Button onClick={handleNextClick} className="next-btn">
              Next
            </Button> */}
            <ProgressBar text={loadText} percent={percent} onClick={handleNextClick}/>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default ScheduleAppointment;
