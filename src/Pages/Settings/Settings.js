import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Tab, Tabs } from "react-bootstrap";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { Redirect } from "react-router";
import BusinessImagesModal from "../../Components/BusinessImagesModal/BusinessImagesModal";
import "./Settings.css";

function Settings({ activeUser, calendar }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fullName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bType, setBType] = useState("");
  const [address, setAddress] = useState("");
  const [bName, setBName] = useState("");
  const [modalImagesShow, setModalImagesShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setEmail(activeUser.email);
    setName(activeUser.fullName);
    setPhone(calendar.phone);
    setBType(calendar.type);
    setAddress(calendar.address);
    setBName(calendar.name);
    setSelectedImage(calendar.image)
  }, []);

  if (!activeUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="p-settings">
      <Tabs
        defaultActiveKey="general"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="general" title="כללי">
          <Form
            className="user-details"
            noValidate
            // validated={validated}
            // onSubmit={handleUserDetails}
          >
            <Form.Row>
              <Form.Group as={Col} md={6} controlId="formBasicFullName">
                <Form.Label>שם מלא (בעל העסק)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="שם מלא"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  אנא הזן שם מלא.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formBasicEmail">
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
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6} controlId="formBasicEmail">
                <Form.Label>אימייל</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="הזן אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  אנא הזן אימייל חוקי.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formBasicEmail">
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
              <Form.Group as={Col} md={6} controlId="formBasicPassword">
                <Form.Label>סיסמא</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="סיסמא"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  אנא הזן סיסמא.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} controlId="formBasicPassword">
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
            <Form.Group controlId="formBasicEmail">
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
            <Button className="btn-save" variant="success" type="submit" block>
              <FaCheckCircle /> שמירת הגדרות
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="services" title="שירותים"></Tab>
        <Tab eventKey="activityHours" title="שעות פעילות"></Tab>
      </Tabs>
    </div>
  );
}

export default Settings;
