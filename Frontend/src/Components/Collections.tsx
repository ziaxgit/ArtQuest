import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  getCollectionsFromLocalStorage,
  setCollectionsToLocalStorage,
} from "../utils/collectionsStorage";
import { LuExternalLink } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

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
  const [artData, setArtData] = useState<Artwork[]>(
    getCollectionsFromLocalStorage()
  );

  console.log(artData);
  const handleDelete = (artworkId: number) => {
    const updatedArtData = artData.filter(
      (artwork) => artwork.id !== artworkId
    );
    setCollectionsToLocalStorage(updatedArtData);
    setArtData(updatedArtData);
  };

  return (
    <Container className="mt-4">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {artData.length > 0 ? "Saved artworks" : "No saved artworks"}
      </h2>
      {artData.length === 0 && (
        <p className="text-center">
          Head to <Link to="/explore">Explore</Link> to browse artworks
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
                <div className="d-flex justify-content-between align-items-center">
                  <a
                    href={artwork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <h5 className="d-flex gap-2 align-items-center flex-wrap">
                      {artwork.title}
                      <LuExternalLink />
                    </h5>
                  </a>
                  <button
                    className="text-decoration-none"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleDelete(artwork.id);
                    }}
                  >
                    <MdDelete color="#c9372c" size={24} />
                  </button>
                </div>
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
