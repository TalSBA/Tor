import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../Styles/Footer.css";

function Footer(props) {
  return (
    <div className="c-footer">
      <Navbar bg="dark" variant="dark">
        <Navbar.Text>&#169; Created By Tal Shabtay </Navbar.Text>
      </Navbar>
    </div>
  );
}

export default Footer;
