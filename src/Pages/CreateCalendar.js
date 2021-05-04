import React, { useState } from "react";
import { Redirect } from "react-router";

function CreateCalendar({ activeUser }) {
  const [showCreateError, setShowCreateError] = useState(false);

  if (!activeUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="p-create-calendar">
    {/* <Card>
      <Card.Header>
        {" "}
        <h1>ברוכים הבאים לתור!</h1>
        <p>אנא מלא את הפרטים הבאים</p>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {showInvalidLogin ? (
            <Alert variant="danger">אחד הפרטים לא תקינים!</Alert>
          ) : null}
          <Form onSubmit={signup}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>שם העסק</Form.Label>
              <Form.Control
                type="name"
                placeholder="שם העסק"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>תחום</Form.Label>
              <Form.Control as="select" value={type} onChange={(e) => setBType(e.target.value)}>
                <option>מספרה</option>
                <option>קוסמטיקה</option>
                <option>אחר</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>טלפון</Form.Label>
              <Form.Control
                type="text"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" block>
              צור יומן
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card> */}
  </div>
  );
}

export default CreateCalendar;
