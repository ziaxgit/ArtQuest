import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";
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
        <h2>Loading...</h2>
      </Container>
    );
  }

  return (
    <Container>
      {exhibition.imageUrl ? (
        <div className="exhibition-img-container mt-4">
          <img src={exhibition.imageUrl} alt={exhibition.name} />
          <div className="exhibition-img-overlay px-4">
            <h1>{exhibition.name}</h1>
            <p>{exhibition.description}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-3 text-center exhibition-h1-p-container text-white">
          <h1 className="mb-4">{exhibition.name}</h1>
          <p>{exhibition.description}</p>
        </div>
      )}
      <Row>
        <h4 className="text-center m-4">Artworks for this exhibition</h4>
        {artworks.map((artwork) => (
          <Col key={artwork.id} xs={12} sm={12} md={6} className="mb-4">
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
                    <h5 className="d-flex gap-2 align-items-center">
                      {artwork.title}
                      <LuExternalLink />
                    </h5>
                  </a>
                  <strong>Creation Date:</strong> {artwork.created_at} <br />
                  <strong>Department:</strong> {artwork.department} <br />
                  <strong>Culture:</strong> {artwork.origin} <br />
                  <strong>Artist:</strong> {artwork.artist} <br />
                  <Card.Text
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: artwork.description }}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
