import React from "react";
import { Badge } from "react-bootstrap";
import services from "../data/Services.json";

function ServicePicker(props) {
  return (
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
  );
}

export default ServicePicker;
