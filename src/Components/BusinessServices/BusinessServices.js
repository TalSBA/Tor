import React, { useEffect, useState } from "react";
import { Form, Button, Badge, Col } from "react-bootstrap";
import "./BusinessServices.css";
import { FaCheckCircle, FaPlus, FaTimes } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";

function BusinessServices({ servicesSettings, onSubmitServices }) {
  const [duration, setDuration] = useState("15 דקות");
  const [serviceName, setServiceName] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (servicesSettings) setServices(servicesSettings);
  }, []);
  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  // function addService() {
  //   if (serviceName.trim()) {
  //     onAddService({ name: serviceName, duration: duration });
  //     setServiceName("");
  //   }
  // }

  // function removeService(serviceId) {
  //   onDeleteService(serviceId);
  // }

  function addService() {
    setServices(
      services.concat({
        id: ID(),
        name: serviceName,
        duration: duration,
      })
    );
    setServiceName("");
  }

  function removeService(serviceId) {
    const newServices = services.filter((service) => service.id != serviceId);
    setServices(newServices);
  }

  function handleServices(event) {
    if (services.length > 0) {
      onSubmitServices(services);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  return (
    <Form className="c-business-services" onSubmit={handleServices}>
      <Form.Label>הוספת שירותים</Form.Label>
      <Form.Group controlId="formBasicServices">
        <Form.Control
          type="text"
          placeholder="שם השירות"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <br />
        <Form.Control
          as="select"
          placeholder="משך השירות"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option>10 דקות</option>
          <option>15 דקות</option>
          <option>20 דקות</option>
          <option>30 דקות</option>
          <option>60 דקות</option>
        </Form.Control>
        <Button className="tor-btn plus" onClick={addService}>
          <FaPlus />
        </Button>
      </Form.Group>
      <div className="services-badge">
        {services &&
          services.map((service) => {
            return (
              <Badge pill>
                <FaTimes onClick={() => removeService(service.id)} />
                {service.name} {service.duration}
              </Badge>
            );
          })}
      </div>
      <p
        className={`validation-error ${services.length === 0 ? "display" : ""}`}
      >
        אנא הוסף שירות אחד לפחות.
      </p>
      {!servicesSettings ? (
        <Button className="btn-next" variant="success" type="submit" block>
          הבא <GrFormPrevious />
        </Button>
      ) : (
        <Button
          className="btn-save"
          type="submit"
          block
          onClick={(event) => {
            handleServices(event);
          }}
        >
          <FaCheckCircle /> שמירת הגדרות
        </Button>
      )}
    </Form>
  );
}

export default BusinessServices;
