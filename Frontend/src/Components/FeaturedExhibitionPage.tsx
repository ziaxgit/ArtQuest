import { Container, Row, Col, Card } from "react-bootstrap";
import { LuExternalLink } from "react-icons/lu";
import { useLocation } from "react-router-dom";

export default function ExhibitionDetailPage() {
  const location = useLocation();
  const { artworks, exhibition } = location.state || {};

  console.log(artworks, exhibition);

  return (
    <Container>
      <div className="exhibition-img-container mt-4">
        <img src={exhibition.imageUrl} alt={exhibition.name} />
        <div className="exhibition-img-overlay px-4">
          <h1>{exhibition.name}</h1>
          <p>{exhibition.description}</p>
        </div>
      </div>
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
