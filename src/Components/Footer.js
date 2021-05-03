import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../Styles/Footer.css";

function Footer(props) {
  return (
    <div className="c-footer">
      <Navbar bg="dark" variant="dark">
        <Navbar.Text> פותח על ידי טל שבתאי &#169;</Navbar.Text>
      </Navbar>
    </div>
  );
}

export default Footer;
