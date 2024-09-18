import { clearExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import artInstituteOfChicagoImage from "../assets/wide_med_art-institute-of-chicago-01-2.jpg";
import clevelandMuseumImage from "../assets/ClevelandMuseum_exterior.jpg";
import { useNavigate } from "react-router-dom";
import "../index.css";
export default function Home() {
  let navigate = useNavigate();

  function handleClick(apiName: string) {
    navigate(`/${apiName}`);
  }

  return (
    <div>
      <button
        onClick={() => clearExhibitionsFromLocalStorage()}
        className="mb-3"
      >
        Reset Local Cache
      </button>
      <Container>
        <p>
          Welcome to ArtQuest – your gateway to a world of artistic
          masterpieces! At ArtQuest, we celebrate the timeless beauty and
          cultural significance of art by showcasing a diverse collection of
          artworks and pieces from renowned museums worldwide. Whether you are
          an art enthusiast, a student, or a professional curator, ArtQuest
          offers a rich and immersive experience tailored to your interests.
        </p>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className="d-flex flex-row flex-wrap border-0 shadow gap-">
              <Col xs={12} md={6}>
                <img
                  src={clevelandMuseumImage}
                  alt="Image"
                  className="img-fluid museum-img"
                />
              </Col>

              <Col xs={12} md={6} className="p-3">
                <h3 className="card-title mb-4">Cleveland Museum of Art</h3>
                <p className="mb-4">
                  The Cleveland Museum of Art, established in 1913, is a
                  distinguished art museum located in Cleveland, Ohio. Renowned
                  for its diverse and comprehensive collection, the museum
                  features over 61,000 artworks from various cultures and time
                  periods. Highlights include pieces by iconic artists such as
                  Caravaggio, Monet, and Picasso.
                </p>
                <Button onClick={() => handleClick("clevelandmuseum")}>
                  Browse
                </Button>
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className="d-flex flex-row flex-wrap border-0 shadow gap-">
              <Col xs={12} md={6} className="p-3">
                <h3 className="card-title mb-4">Art Institute of Chicago</h3>
                <p className="mb-4">
                  The Chicago Art Institute, founded in 1879, is a premier art
                  museum located in the heart of Chicago. It boasts an extensive
                  collection of artwork from around the world, featuring
                  masterpieces by artists such as Vincent van Gogh, Grant Wood,
                  and Georges Seurat. Known for its rich educational programs
                  and public engagement initiatives.
                </p>
                <Button onClick={() => handleClick("chichagoart")}>
                  Browse
                </Button>
              </Col>
              <Col xs={12} md={6}>
                <img
                  src={artInstituteOfChicagoImage}
                  alt="Image"
                  className="img-fluid museum-img"
                />
              </Col>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Container>
        <h2 className="text-center">Let's explore...</h2>
        <Row className="mt-4 justify-content-center">
          <Col xs={10} sm={12} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={clevelandMuseumImage}
                className="img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Cleveland Museum of Art</Card.Title>
                <Card.Text>
                  The Cleveland Museum of Art, established in 1913, is a
                  distinguished art museum located in Cleveland, Ohio. Renowned
                  for its diverse and comprehensive collection, the museum
                  features over 61,000 artworks from various cultures and time
                  periods. Highlights include pieces by iconic artists such as
                  Caravaggio, Monet, and Picasso.
                </Card.Text>
              </Card.Body>
              <Button
                onClick={() => handleClick("clevelandmuseum")}
                className="w-100 rounded-0"
                variant="primary"
              >
                Browse
              </Button>
            </Card>
          </Col>
          <Col xs={10} sm={12} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={artInstituteOfChicagoImage}
                className="img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Art Institute of Chicago</Card.Title>
                <Card.Text>
                  The Chicago Art Institute, founded in 1879, is a premier art
                  museum located in the heart of Chicago. It boasts an extensive
                  collection of artwork from around the world, featuring
                  masterpieces by artists such as Vincent van Gogh, Grant Wood,
                  and Georges Seurat. Known for its rich educational programs
                  and public engagement initiatives.
                </Card.Text>
              </Card.Body>
              <Button
                onClick={() => handleClick("chichagoart")}
                className="w-100 rounded-0"
                variant="primary"
              >
                Browse
              </Button>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}
