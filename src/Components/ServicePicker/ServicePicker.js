import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import services from "../../data/Services.json";
import "./ServicePicker.css";

function ServicePicker({ onChange }) {
  const [selectedServices, setSelectedServices] = React.useState([]);
  const [countTime, setCountTime] = React.useState(0);

  useEffect(() => {
    onChange(selectedServices, countTime);
  }, [selectedServices, countTime]);

  function serviceSelected(e) {
    var selectedServicesIndex = selectedServices.findIndex(
      (service) => service.id === e.target.id
    );
    if (selectedServicesIndex != -1) {
      const newServices = [...selectedServices];
      newServices.splice(selectedServicesIndex, 1);
      console.log("newServices", newServices);
      setSelectedServices(newServices);

      let newTime =
        countTime - parseInt(selectedServices[selectedServicesIndex].duration);
      setCountTime(newTime);
    } else {
      var index = services.findIndex((service) => service.id === e.target.id);
      setSelectedServices([...selectedServices, services[index]]);

      let newTime = countTime + parseInt(services[index].duration);
      setCountTime(newTime);
    }
    console.log(selectedServices);
  }
  return (
    <div className="services">
      <div className="header">
        <h4>בחירת שירות</h4>
        <div className="count-time">
          <label>{countTime}</label>
          <FaClock />
        </div>
      </div>
      {services.map((service) => {
        return (
          <Badge
            pill
            className={`${
              selectedServices.includes(service) ? "selected-service" : null
            }`}
            id={service.id}
            onClick={(e) => serviceSelected(e)}
          >
            {service.name} - {service.duration}
          </Badge>
        );
      })}
    </div>
  );
}

export default ServicePicker;
