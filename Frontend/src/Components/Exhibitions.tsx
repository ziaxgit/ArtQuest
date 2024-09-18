import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Dropdown,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { fetchChicagoApiData } from "../utils/fetchApiData";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  getCollectionsFromLocalStorage,
  setCollectionsToLocalStorage,
} from "../utils/collectionsStorage";
import {
  getExhibitionsFromLocalStorage,
  setExhibitionsToLocalStorage,
} from "../utils/exhibitionStorage";

interface Artwork {
  id: number;
  title: string;
  description: string;
  artist: string;
  origin: string;
  department: string;
  url: string;
  image_src: string;
  created_at: string;
}
export default function Exhibitions() {
  const [artData, setArtData] = useState<Artwork[]>(
    getCollectionsFromLocalStorage()
  );
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(
    getExhibitionsFromLocalStorage()
  );
  const [show, setShow] = useState(false);
  const [exhibitionName, setExhibitionName] = useState("");
  const [exhibitionDescription, setExhibitionDescription] = useState("");
  const [exhibitionImage, setExhibitionImage] = useState<File | null>(null);

  const handleClose = () => {
    console.log("handleClick");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExhibitionImage(e.target.files[0]);
    }
  };

  const handleCreate = () => {
    if (exhibitionName.trim()) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newExhibitionList = [
          ...exhibitions,
          {
            name: exhibitionName.trim(),
            description: exhibitionDescription.trim(),
            path: `/exhibitions/${exhibitionName.trim()}`,
            imageUrl: reader.result as string,
          },
        ];
        setExhibitions(newExhibitionList);
        setExhibitionsToLocalStorage(newExhibitionList);
        setExhibitionName("");
        setExhibitionDescription("");
        setExhibitionImage(null);
        handleClose();
      };
      if (exhibitionImage) {
        reader.readAsDataURL(exhibitionImage);
      } else {
        const newExhibitionList = [
          ...exhibitions,
          {
            name: exhibitionName.trim(),
            description: exhibitionDescription.trim(),
            path: `/exhibitions/${exhibitionName.trim()}`,
            imageUrl: "",
          },
        ];
        setExhibitions(newExhibitionList);
        setExhibitionsToLocalStorage(newExhibitionList);
        setExhibitionName("");
        setExhibitionDescription("");
        handleClose();
      }
    }
  };

  return (
    <>
      <Container>
        <Button onClick={handleShow} variant="primary" className="mt-4">
          New Exhibition
        </Button>
        <Row className="mt-4">
          {exhibitions.map((exhibition, index) => (
            <Col key={index} xs={12} sm={6} md={6} className="mb-4">
              <Card className="rounded-0 rounded-top-2 shadow-sm">
                {exhibition.imageUrl && (
                  <Card.Img variant="top" src={exhibition.imageUrl} />
                )}
                <Card.Body>
                  <Card.Title>{exhibition.name}</Card.Title>
                  <Card.Text>{exhibition.description}</Card.Text>
                </Card.Body>
              </Card>
              <Button className="w-75 rounded-0" variant="secondary">
                View exhibition
              </Button>
              <Button className="w-25 rounded-0" variant="danger">
                Delete
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Exhibition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formExhibitionName">
              <Form.Label>Exhibition Name</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Enter name"
                value={exhibitionName}
                onChange={(e) => setExhibitionName(e.target.value)}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter description"
                value={exhibitionDescription}
                onChange={(e) => setExhibitionDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mt-2">
              <Form.Label>Choose an image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
          <Form.Label className="mt-2">
            Select artworks for this exhibition
          </Form.Label>
          <ListGroup>
            {artData.map((artwork) => (
              <ListGroup.Item
                key={artwork.id}
                className="d-flex justify-content-between align-items-center"
              >
                <Form.Check
                  type="checkbox"
                  id={`checkbox-${artwork.id}`}
                  label={`${artwork.title} by ${artwork.artist}`}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
