import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Tab, Tabs } from "react-bootstrap";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { Redirect } from "react-router";
import BusinessImagesModal from "../../Components/BusinessImagesModal/BusinessImagesModal";
import BusinessServices from "../../Components/BusinessServices/BusinessServices";
import CalendarDetails from "../../Components/CalendarDetails/CalendarDetails";
import DayHours from "../../Components/DayHours/DayHours";
import DayHoursModel from "../../Model/DayHours";
import UserDetails from "../../Components/UserDetails/UserDetails";
import ActivityHours from "../../Model/ActivityHours";
import "./Settings.css";

function Settings({
  activeUser,
  calendar,
  onChangeUser,
  onChangeGeneralDetails,
}) {
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState(calendar.phone);
  const [bType, setBType] = useState(calendar.type);
  const [address, setAddress] = useState(calendar.address);
  const [bName, setBName] = useState(calendar.name);

  const [validated, setValidated] = useState(false);
  const [activityHours, setActivityHours] = useState(
    new ActivityHours([
      new DayHoursModel("א", "התחלה", "סיום", false),
      new DayHoursModel("ב", "התחלה", "סיום", false),
      new DayHoursModel("ג", "התחלה", "סיום", false),
      new DayHoursModel("ד", "התחלה", "סיום", false),
      new DayHoursModel("ה", "התחלה", "סיום", false),
      new DayHoursModel("ו", "התחלה", "סיום", false),
      new DayHoursModel("ש", "התחלה", "סיום", false),
    ])
  );

  useEffect(() => {
    setServices(calendar.services);
    setSelectedImage(calendar.image);
    setActivityHours(new ActivityHours(calendar.activityHours));
    console.log(new ActivityHours(calendar.activityHours));
  }, []);
  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

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

  if (!activeUser || !calendar) {
    return <Redirect to="/" />;
  }
  return (
    <div className="p-settings">
      <Tabs defaultActiveKey="user" transition={false} id="noanim-tab-example">
        <Tab eventKey="user" title="משתמש">
          <UserDetails
            onSubmitUserDetails={(updatedUser) =>
              onChangeUser({ ...updatedUser, id: activeUser.id })
            }
            activeUser={activeUser}
          />
        </Tab>
        <Tab eventKey="general" title="כללי">
          <CalendarDetails
            calendar={calendar}
            onNameChange={(name) => setBName(name)}
            onAddressChange={(address) => setAddress(address)}
            onTypeChange={(type) => setBType(type)}
            onPhoneChange={(phone) => setPhone(phone)}
          />
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
            className="btn-save"
            type="submit"
            block
            onClick={() => onChangeGeneralDetails(calendar.id, bName, address, bType, phone, selectedImage)}
          >
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
          <DayHours activityHours={activityHours} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
