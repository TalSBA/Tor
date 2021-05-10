import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

function Home(props) {

  return (
    <div className="p-home">
      <div className="background-cover">
        <h1>תור</h1>
        <h4>דרך נוחה ופשוטה לנהל יומן תורים עבור העסק שלך</h4>
        <Link to="./create-calendar">
          <Button>יצירת יומן</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
