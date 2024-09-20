import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCollectionsFromLocalStorage } from "../utils/collectionsStorage";

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

export default function Collections() {
  const [artData] = useState<Artwork[]>(getCollectionsFromLocalStorage());

  return (
    <Container className="mt-4">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {artData.length > 0
          ? "Your saved artworks"
          : "No saved artworks yet :("}
      </h2>

      <Row className="mt-4">
        {artData.map((artwork: Artwork, index) => (
          <Col key={index} sm={6} md={6} lg={6} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={artwork.image_src}
                alt={artwork.title}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Card.Body>
                <Link className="text-decoration-none" to={artwork.url}>
                  <Card.Title>{artwork.title}</Card.Title>
                </Link>
                <Card.Text>
                  <strong>Creation Date:</strong> {artwork.created_at} <br />
                  <strong>Department:</strong> {artwork.department} <br />
                  <strong>Culture:</strong> {artwork.origin} <br />
                  {/* <strong>Technique:</strong> {artwork.technique} <br /> */}
                  <strong>Creator: </strong>
                  {artwork.artist} <br />
                </Card.Text>
                <Card.Text
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
