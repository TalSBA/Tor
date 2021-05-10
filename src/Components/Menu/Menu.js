import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import calendarIcn from "./images/calendar-icon.png";
import "./Menu.css";

function Menu({ activeUser, onLogout }) {
  return (
    <div className="c-menu">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#/">
          <img width="30px" height="30px" src={calendarIcn}></img>
        </Navbar.Brand>
        {activeUser ? (
          <Navbar.Text>
            שלום, {activeUser.fullName}
          </Navbar.Text>
        ) : (
          ""
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
          {activeUser ? (
            <Nav>
              <Nav.Link href="#/calendar">היומן שלי</Nav.Link>
              <Nav.Link href="#" onClick={onLogout}>התנתק</Nav.Link>
              {/* <span className="divider"></span> */}
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="#/login">התחבר</Nav.Link>
              <Nav.Link href="#/signup">הרשם</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;
