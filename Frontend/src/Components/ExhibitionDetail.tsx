// ExhibitionDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";
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

interface Exhibition {
  name: string;
  path: string;
  description: string;
  artworks: number[];
  imageUrl?: string;
}

export default function ExhibitionDetail() {
  const { exhibitionName } = useParams();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const exhibitions = getExhibitionsFromLocalStorage();
    const foundExhibition = exhibitions.find(
      (ex) => ex.name === exhibitionName
    );
    if (foundExhibition) {
      setExhibition(foundExhibition);
      // Get the artworks associated with this exhibition
      const allArtworks = getCollectionsFromLocalStorage();
      const exhibitionArtworks = allArtworks.filter((artwork) =>
        foundExhibition.artworks.includes(artwork.id)
      );
      setArtworks(exhibitionArtworks);
    }
  }, [exhibitionName]);

  if (!exhibition) {
    return (
      <Container>
        <h2>Exhibition not found</h2>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mt-4">{exhibition.name}</h2>
      <p>{exhibition.description}</p>
      {exhibition.imageUrl && (
        <img
          src={exhibition.imageUrl}
          alt={exhibition.name}
          className="img-fluid mb-4"
        />
      )}
      <Row>
        {artworks.map((artwork) => (
          <Col key={artwork.id} xs={12} sm={12} className="mb-4">
            <Card className="h-100">
              {artwork.image_src && (
                <Card.Img
                  variant="top"
                  src={artwork.image_src}
                  alt={artwork.title}
                />
              )}
              <Card.Body>
                <Card.Text>
                  <a
                    href={artwork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <h4>{artwork.title}</h4>
                  </a>
                  <strong>Creation Date:</strong> {artwork.created_at} <br />
                  <strong>Department:</strong> {artwork.department} <br />
                  <strong>Culture:</strong> {artwork.origin} <br />
                  <strong>Artist:</strong> {artwork.artist} <br />
                  <strong>Description:</strong> {artwork.description} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
