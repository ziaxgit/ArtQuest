import { Container, Row, Col } from "react-bootstrap";
import { featuredExhibitions } from "../data/featuredExhibition";

function FeaturedExhibition() {
  return (
    <Container>
      <a href="/exhibitions" className="text-decoration-none text-black">
        <h4 className="featured-title mb-4 text-center">
          FEATURED EXHIBITIONS
        </h4>
      </a>
      <div className="featured-exhibitions-container">
        <Row className="home-exhibition-row">
          {featuredExhibitions.map((exhibition) => {
            return (
              <Col sm={12} md={6} lg={6} key={exhibition.name}>
                <a href={`/exhibitions/${exhibition.name}`}>
                  <img
                    src={exhibition.imageUrl}
                    alt={exhibition.name}
                    className="img-fluid"
                  />
                </a>
                <a
                  className="text-decoration-none text-black"
                  href={`/exhibitions/${exhibition.name}`}
                >
                  <h5 className="mt-3">{exhibition.name}</h5>
                </a>
                <p className="text-black-50 custom-margin1">
                  {exhibition.description}
                </p>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}

export default FeaturedExhibition;
