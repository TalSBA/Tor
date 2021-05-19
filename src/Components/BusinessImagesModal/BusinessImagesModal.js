import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import "./BusinessImagesModal.css";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GrFormPrevious } from "react-icons/gr";

const imageList = ["/gel.jpg", "/london-barbershop.jpg", "/gentelmen barbershop.jpg", "/cosmetics.jpg", "/resturant.jpg"];
const relImagesPath = window.location.origin + "/images";
function BusinessImagesModal({
  selectedImageSettings,
  onSubmitImage,
  onHide,
  show,
}) {
  const [imageSelected, setSelectedImage] = useState({
    src: relImagesPath + "/564-5640631_file-antu-insert-image-svg-insert-image-here.png",
  });

  useEffect(() => {
    if (selectedImageSettings) {
      setSelectedImage({src: selectedImageSettings});
    }
  }, []);
  function handleSelectImage() {
    onHide();
  }
  return (
    <div>
      <Modal className="c-image-modal" show={show} onHide={onHide}>
        <Modal.Body className="show-grid">
          <Container>
            <ImagePicker
              images={imageList.map((image, i) => ({
                src: relImagesPath + image,
                value: i,
              }))}
              onPick={setSelectedImage}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSelectImage}>שמור</Button>
          <Button onClick={onHide}>סגור</Button>
        </Modal.Footer>
      </Modal>
      {imageSelected ? <Image src={imageSelected.src} /> : ""}
      <div></div>
      {!selectedImageSettings ? (
        <Button
          variant="success"
          className="btn-next"
          onClick={() => onSubmitImage(imageSelected)}
        >
          <span>
            הבא <GrFormPrevious />
          </span>
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default BusinessImagesModal;
