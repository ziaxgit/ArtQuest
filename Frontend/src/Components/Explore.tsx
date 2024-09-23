import { Container, Row, Col, Card, Button } from "react-bootstrap";
import artInstituteOfChicagoImage from "../assets/wide_med_art-institute-of-chicago-01-2.jpg";
import clevelandMuseumImage from "../assets/ClevelandMuseum_exterior.jpg";

import { useNavigate } from "react-router-dom";

export default function Explore() {
  let navigate = useNavigate();

  function handleClick(apiName: string) {
    navigate(`/${apiName}`);
  }
  return (
    <Container className="mt-4">
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
      <Row className="mt-4">
        <Col>
          <Card className="d-flex flex-row flex-wrap border-0 shadow gap-">
            <Col xs={12} md={6}>
              <img
                src={artInstituteOfChicagoImage}
                alt="Image"
                className="img-fluid museum-img"
              />
            </Col>
            <Col xs={12} md={6} className="p-3">
              <h3 className="card-title mb-4">Art Institute of Chicago</h3>
              <p className="mb-4">
                The Chicago Art Institute, founded in 1879, is a premier art
                museum located in the heart of Chicago. It boasts an extensive
                collection of artwork from around the world, featuring
                masterpieces by artists such as Vincent van Gogh, Grant Wood,
                and Georges Seurat. Known for its rich educational programs and
                public engagement initiatives.
              </p>
              <Button onClick={() => handleClick("chichagoart")}>Browse</Button>
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
