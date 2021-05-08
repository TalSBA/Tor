import React, { useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "../Styles/ScheduleAppointment.css";
import services from "../data/Services.json";
import DatePickers from "../Components/DatePicker";

function ScheduleAppointment(props) {
  const [paging, setPaging] = useState("services");

  function handlerNextClick() {
    if (paging === "services") {
      setPaging("datePicker");
    }
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.9460766982834!2d34.7856410848804!3d32.07070718119105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b829eb12dd1%3A0x2c681e75744e9d07!2z15TXkNeo15HXoteUIDUsINeq15wg15DXkdeZ15Eg15nXpNeV!5e0!3m2!1siw!2sil!4v1620475569722!5m2!1siw!2sil"
            ></iframe>
          </div>
        </aside>
        <section>
          <div className="appointment-details-container">
            {paging === "services" ? (
              <div className="services">
                <h4>בחר שירות:</h4>
                {services.map((service) => {
                  console.log(service);
                  return (
                    <div>
                      <Badge pill>
                        {service.name} - {service.duration}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {paging === "datePicker" ? <DatePickers /> : ""}
            <Button onClick={handlerNextClick} className="next-btn">
              Next
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default ScheduleAppointment;