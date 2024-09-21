import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCollectionsFromLocalStorage } from "../utils/collectionsStorage";
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

interface Exhibition {
  name: string;
  path: string;
  description: string;
  artworks: number[];
  imageUrl?: string;
}

export default function Exhibitions() {
  const [artData] = useState<Artwork[]>(getCollectionsFromLocalStorage());
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(
    getExhibitionsFromLocalStorage()
  );
  const [show, setShow] = useState(false);
  const [exhibitionName, setExhibitionName] = useState("");
  const [exhibitionDescription, setExhibitionDescription] = useState("");
  const [exhibitionImage, setExhibitionImage] = useState<File | null>(null);
  const [selectedArtworks, setSelectedArtworks] = useState<number[]>([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExhibitionImage(e.target.files[0]);
    }
  };

  const handleArtworkSelection = (artworkId: number) => {
    setSelectedArtworks((prevSelected) => {
      if (prevSelected.includes(artworkId)) {
        // Deselect the artwork
        return prevSelected.filter((id) => id !== artworkId);
      } else {
        // Select the artwork
        return [...prevSelected, artworkId];
      }
    });
  };

  const handleCreate = () => {
    if (exhibitionName.trim()) {
      const newExhibition = {
        name: exhibitionName.trim(),
        description: exhibitionDescription.trim(),
        path: `/exhibitions/${encodeURIComponent(exhibitionName.trim())}`,
        imageUrl: "",
        artworks: selectedArtworks,
      };

      if (exhibitionImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newExhibition.imageUrl = reader.result as string;
          saveExhibition(newExhibition);
        };
        reader.readAsDataURL(exhibitionImage);
      } else {
        saveExhibition(newExhibition);
      }
    }
  };

  const saveExhibition = (exhibition: Exhibition) => {
    const newExhibitionList = [...exhibitions, exhibition];
    setExhibitions(newExhibitionList);
    setExhibitionsToLocalStorage(newExhibitionList);
    // Reset form fields
    setExhibitionName("");
    setExhibitionDescription("");
    setExhibitionImage(null);
    setSelectedArtworks([]);
    handleClose();
  };

  const handleDelete = (index: number) => {
    const newExhibitionList = [...exhibitions];
    newExhibitionList.splice(index, 1);
    setExhibitions(newExhibitionList);
    setExhibitionsToLocalStorage(newExhibitionList);
  };

  return (
    <>
      <Container>
        <Button onClick={handleShow} variant="primary" className="mt-4">
          New Exhibition
        </Button>
        <Row className="mt-4 ">
          {exhibitions.map((exhibition, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4 ">
              <Card className="rounded-0 rounded-top-2 shadow-sm ">
                {exhibition.imageUrl && (
                  <img
                    src={exhibition.imageUrl}
                    className="exhibition-image"
                    alt={exhibition.name}
                  />
                )}
                <Card.Body>
                  <Card.Title>{exhibition.name}</Card.Title>
                  <Card.Text>{exhibition.description}</Card.Text>
                </Card.Body>
              </Card>
              <Link
                to={exhibition.path}
                className="btn btn-secondary w-75 rounded-0"
              >
                View Exhibition
              </Link>
              <Button
                className="w-25 rounded-0"
                variant="danger"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} size="lg">
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
              <ListGroup.Item key={artwork.id} className="border-secondary">
                <Form.Check
                  type="checkbox"
                  id={`checkbox-${artwork.id}`}
                  label={`${artwork.title} by ${artwork.artist}`}
                  className="custom-checkbox"
                  onChange={() => handleArtworkSelection(artwork.id)}
                  checked={selectedArtworks.includes(artwork.id)}
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
