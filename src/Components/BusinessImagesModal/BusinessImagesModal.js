import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "./BusinessImagesModal.css";
import gelImg from "./images/gel.jpg";
import barberImg from "./images/london-barbershop.jpg";
import barberGentelImg from "./images/gentelmen barbershop.jpg";
import cosmetics from "./images/cosmetics.jpg";
import resturant from "./images/resturant.jpg";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const imageList = [gelImg, barberImg, barberGentelImg, cosmetics, resturant];


function BusinessImagesModal({onSubmitImage, onHide ,show}) {
  const [imageSelected, setSelectedImage] = useState(null);

  function handleSelectImage(){
    onSubmitImage(imageSelected);
    onHide();
}
  return (
    <Modal className="c-image-modal" show={show} onHide={onHide}>
      <Modal.Body className="show-grid">
        <Container>
          <ImagePicker
            images={imageList.map((image, i) => ({ src: image, value: i }))}
            onPick={setSelectedImage}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSelectImage}>שמור</Button>
        <Button onClick={onHide}>סגור</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BusinessImagesModal;
