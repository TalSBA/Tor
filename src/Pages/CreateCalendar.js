import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Card, Form, Alert, Button, Image, Col } from "react-bootstrap";
import "../Styles/CreateCalendar.css";
import BusinessServices from "../Components/BusinessServices";
import BusinessImagesModal from "../Components/BusinessImagesModal";
import ConfirmCalendar from "./ConfirmCalendar";
import ActivityHoursModal from "../Components/ActivityHoursModal";
import ActivityHours from "../Model/ActivityHours";
import DayHours from "../Model/DayHours";

function CreateCalendar({ activeUser }) {
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
      new DayHours("א", "התחלה", "סיום", false),
      new DayHours("ב", "התחלה", "סיום", false),
      new DayHours("ג", "התחלה", "סיום", false),
      new DayHours("ד", "התחלה", "סיום", false),
      new DayHours("ה", "התחלה", "סיום", false),
      new DayHours("ו", "התחלה", "סיום", false),
      new DayHours("ש", "התחלה", "סיום", false),
    ])
  );
  const [activityHoursUpdated, setActivityHoursUpdated] = useState(null);


  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  function createCalendar(event) {
    const form = event.currentTarget;
    if (!form.checkValidity() || services.length === 0) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setCalendar({
        name: bName,
        address: address,
        type: bType,
        phone: phone,
        services: services,
        image: selectedImage ? selectedImage.src : null,
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
        <ConfirmCalendar calendar={calendar} />
      ) : (
        <Card>
          <Card.Header>
            <p>אנא מלא את הפרטים הבאים</p>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {showCreateError ? (
                <Alert variant="danger">אחד הפרטים לא תקינים!</Alert>
              ) : null}
              <Form noValidate validated={validated} onSubmit={createCalendar}>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="formBasicEmail">
                    <Form.Label>שם העסק</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="שם העסק"
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הזן שם עסק.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="formBasicEmail">
                    <Form.Label>כתובת</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="כתובת"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הזן כתובת.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="formBasicEmail">
                    <Form.Label>תחום</Form.Label>
                    <Form.Control
                      as="select"
                      value={bType}
                      onChange={(e) => setBType(e.target.value)}
                    >
                      <option>מספרה</option>
                      <option>קוסמטיקה</option>
                      <option>אחר</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="formBasicPassword">
                    <Form.Label>טלפון</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="טלפון"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      אנא הזן טלפון.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
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
                  className="pic-image-btn"
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
                  className="pic-image-btn"
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
                  <span>צור יומן</span>
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default CreateCalendar;
