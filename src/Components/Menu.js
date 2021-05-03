import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import calendarIcn from "../Styles/images/calendar-icon.png";
import "../Styles/Menu.css";

function Menu({ activeUser }) {
  return (
    <div className="c-menu">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {activeUser ? (
            <Nav>
              <Nav.Link href="#/calendar">היומן שלי</Nav.Link>
              <span className="divider"></span>
              <Navbar.Text>שלום, {activeUser.fname}</Navbar.Text>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="#/login">התחבר</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        <Navbar.Brand href="#/">
          <img width="50px" height="50px" src={calendarIcn}></img>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Menu;
