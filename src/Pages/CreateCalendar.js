import React, { useState } from "react";
import { Redirect } from "react-router";
import { Card, Form, Alert, Button, Image, Col } from "react-bootstrap";
import "../Styles/CreateCalendar.css";
import BusinessServices from "../Components/BusinessServices";
import BusinessImagesModal from "../Components/BusinessImagesModal";

function CreateCalendar({ activeUser }) {
  const [showCreateError, setShowCreateError] = useState(false);
  const [phone, setPhone] = useState("");
  const [bType, setBType] = useState("");
  const [address, setAddress] = useState("");
  const [bName, setBName] = useState("");
  const [services, setServices] = useState([]);
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [validated, setValidated] = useState(false);

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  function createCalendar() {}

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
  return (
    <div className="p-create-calendar">
      <Card>
        <Card.Header>
          <p>אנא מלא את הפרטים הבאים</p>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {showCreateError ? (
              <Alert variant="danger">אחד הפרטים לא תקינים!</Alert>
            ) : null}
            <Form onSubmit={createCalendar}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="formBasicEmail">
                  <Form.Label>שם העסק</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="שם העסק"
                    value={bName}
                    onChange={(e) => setBName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formBasicEmail">
                  <Form.Label>כתובת</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="כתובת"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="formBasicEmail">
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
                <Form.Group as={Col} md="4" controlId="formBasicPassword">
                  <Form.Label>טלפון</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="טלפון"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              <BusinessServices
                services={services}
                onAddService={addService}
                onDeleteService={deleteService}
              />
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
              <Button variant="success" type="submit" block>
                <span> צור יומן</span>
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateCalendar;
