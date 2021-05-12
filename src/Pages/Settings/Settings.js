import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Tab, Tabs } from "react-bootstrap";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { Redirect } from "react-router";
import BusinessImagesModal from "../../Components/BusinessImagesModal/BusinessImagesModal";
import BusinessServices from "../../Components/BusinessServices/BusinessServices";
import CalendarDetails from "../../Components/CalendarDetails/CalendarDetails";
import UserDetails from "../../Components/UserDetails/UserDetails";
import "./Settings.css";

function Settings({ activeUser, calendar }) {
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [services, setServices] = useState([]);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setServices(calendar.services);
    setSelectedImage(calendar.image);
  }, []);
  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  function saveChanges(updatedUser) {
    console.log(updatedUser);
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

  if (!activeUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="p-settings">
      <Tabs defaultActiveKey="user" transition={false} id="noanim-tab-example">
        <Tab eventKey="user" title="משתמש">
          <UserDetails
            onSubmitUserDetails={(updatedUser) => saveChanges(updatedUser)}
            activeUser={activeUser}
          />
        </Tab>
        <Tab eventKey="general" title="כללי">
          <CalendarDetails calendar={calendar} />
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
          <Button className="btn-save" type="submit" block>
            <FaCheckCircle /> שמירת הגדרות
          </Button>
        </Tab>
        <Tab eventKey="services" title="שירותים">
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
          <Button className="btn-save" type="submit" block>
            <FaCheckCircle /> שמירת הגדרות
          </Button>
        </Tab>
        <Tab eventKey="activityHours" title="שעות פעילות">
          
        </Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
