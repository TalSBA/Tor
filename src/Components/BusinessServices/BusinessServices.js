import React, { useState } from "react";
import { Form, Button, Badge, Col } from "react-bootstrap";
import "./BusinessServices.css";
import { FaPlus, FaTimes } from "react-icons/fa";

function BusinessServices({ services, onAddService, onDeleteService }) {
  const [duration, setDuration] = useState("15 דקות");
  const [serviceName, setServiceName] = useState("");

  function addService() {
    if (serviceName.trim()) {
      onAddService({ name: serviceName, duration: duration });
      setServiceName("");
    }
  }

  function removeService(serviceId) {
    onDeleteService(serviceId);
  }

  return (
    <Form className="c-business-services">
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
        <Button onClick={addService}>
          <FaPlus />
        </Button>
      </Form.Group>
      {services &&
        services.map((service) => {
          return (
            <Badge pill>
              <FaTimes onClick={() => removeService(service.id)} />
              {service.name} {service.duration}
            </Badge>
          );
        })}
    </Form>
  );
}

export default BusinessServices;
