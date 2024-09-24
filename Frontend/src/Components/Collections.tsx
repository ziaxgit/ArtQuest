import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCollectionsFromLocalStorage } from "../utils/collectionsStorage";
import { LuExternalLink } from "react-icons/lu";

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
        {artData.length > 0 ? "Saved artworks" : "No saved artworks"}
      </h2>
      {artData.length === 0 && (
        <p className="text-center">
          Head to <a href="/explore">Explore</a> to browse artworks
        </p>
      )}

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
                <a
                  href={artwork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <h5 className="d-flex gap-2 align-items-center">
                    {artwork.title}
                    <LuExternalLink />
                  </h5>
                </a>
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
