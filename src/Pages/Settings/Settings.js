import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Tab, Tabs, Toast } from "react-bootstrap";
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
  onChangeServices,
  onChangeActivityHours,
}) {
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [services, setServices] = useState([]);
  const [phone, setPhone] = useState("");
  const [bType, setBType] = useState("");
  const [address, setAddress] = useState("");
  const [bName, setBName] = useState("");
  const [saved, setSaved] = useState(false);

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

  useEffect(() => {
    if (calendar) {
      setServices(calendar.services);
      setSelectedImage(calendar.image);
      setActivityHours(calendar.activityHours);
      setPhone(calendar.phone);
      setBType(calendar.type);
      setAddress(calendar.address);
      setBName(calendar.name);
    }
  }, []);
  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  function updateHours(dayHours) {
    var index = activityHours.dayHours.findIndex((x) => x.day === dayHours.day);
    const newActivityHours = { ...activityHours };
    newActivityHours.dayHours[index] = dayHours;
    setActivityHours(newActivityHours);
  }
  function savedChanges() {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }
  if (!activeUser || !calendar) {
    return <Redirect to="/" />;
  }
  return (
    <div className="p-settings">
      <Toast className={` ${saved ? "display" : "saved-toast"} `}>
        <Toast.Body>הפרטים עודכנו בהצלחה!</Toast.Body>
      </Toast>
      <Tabs defaultActiveKey="user" transition={false} id="noanim-tab-example">
        <Tab eventKey="user" title="משתמש">
          <UserDetails
            onSubmitUserDetails={(updatedUser) => {
              onChangeUser({ ...updatedUser, id: activeUser.id });
              savedChanges();
            }}
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
            selectedImageSettings={calendar.image}
            show={modalImagesShow}
            onHide={() => setModalImagesShow(false)}
            onSubmitImage={(image) => setSelectedImage(image)}
          />
          <Button
            className="btn-save"
            type="submit"
            block
            onClick={() => {
              onChangeGeneralDetails(
                calendar.id,
                bName,
                address,
                bType,
                phone,
                selectedImage
              );
              savedChanges();
            }}
          >
            <FaCheckCircle /> שמירת הגדרות
          </Button>
        </Tab>
        <Tab eventKey="services" title="שירותים">
          <BusinessServices
            servicesSettings={calendar.services}
            onSubmitServices={(services) => {
              onChangeServices(calendar.id, services);
              savedChanges();
            }}
          />
        </Tab>
        <Tab eventKey="activityHours" title="שעות פעילות">
          <DayHours
            activityHours={activityHours}
            onSelectHours={(dayHours) => updateHours(dayHours)}
          />
          <Button
            className="btn-save"
            type="submit"
            block
            onClick={() => {
              onChangeActivityHours(calendar.id, activityHours);
              savedChanges();
            }}
          >
            <FaCheckCircle /> שמירת הגדרות
          </Button>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
