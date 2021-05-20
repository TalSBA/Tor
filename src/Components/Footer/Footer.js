import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Footer.css";

function Footer(props) {
  return (
    <footer className="c-footer">
      <Navbar>
        <Navbar.Text>
          &#169; Created By Tal Shabtay{" "}
        </Navbar.Text>
        <Navbar.Text  className="dev">
          Demo mode{" "}
        </Navbar.Text>
      </Navbar>
    </footer>
  );
}

export default Footer;
