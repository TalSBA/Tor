import React, { useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import "./BusinessImagesModal.css";
import gelImg from "./images/gel.jpg";
import barberImg from "./images/london-barbershop.jpg";
import barberGentelImg from "./images/gentelmen barbershop.jpg";
import cosmetics from "./images/cosmetics.jpg";
import resturant from "./images/resturant.jpg";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import defaultImg from "./images/564-5640631_file-antu-insert-image-svg-insert-image-here.png";
import { GrFormPrevious } from "react-icons/gr";

const imageList = [gelImg, barberImg, barberGentelImg, cosmetics, resturant];

function BusinessImagesModal({ onSubmitImage, onHide, show }) {
  const [imageSelected, setSelectedImage] = useState({ src: defaultImg });

  function handleSelectImage() {
    onHide();
  }
  return (
    <div>
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
      {imageSelected ? (
        <Image width="300px" height="300px" src={imageSelected.src} />
      ) : (
        ""
      )}
      <div></div>
      <Button variant="success" className="btn-next" onClick={() => onSubmitImage(imageSelected)}>
        <span>
          הבא <GrFormPrevious />
        </span>
      </Button>
    </div>
  );
}

export default BusinessImagesModal;
