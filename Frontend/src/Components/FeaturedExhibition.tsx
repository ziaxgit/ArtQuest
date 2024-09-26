import { Container, Row, Col } from "react-bootstrap";
import {
  featuredExhibitions,
  chineseArtExhibition,
  vincentVanGoghExhibition,
} from "../data/featuredExhibition";
import { Link, useNavigate } from "react-router-dom";

function FeaturedExhibition() {
  console.log(featuredExhibitions);
  const navigate = useNavigate();

  function navigateToPage(exhibitionName) {
    console.log(exhibitionName);
    if (exhibitionName === "Van Gogh's Masterpieces") {
      navigate(`/exhibitions/featured/${exhibitionName}`, {
        state: {
          exhibition: featuredExhibitions[0],
          artworks: vincentVanGoghExhibition,
        },
      });
    } else {
      navigate(`/exhibitions/featured/${exhibitionName}`, {
        state: {
          exhibition: featuredExhibitions[1],
          artworks: chineseArtExhibition,
        },
      });
    }
  }

  return (
    <Container>
      <Link to="/exhibitions" className="text-decoration-none text-black">
        <h4 className="featured-title mb-4 text-center">
          FEATURED EXHIBITIONS
        </h4>
      </Link>
      <div className="featured-exhibitions-container">
        <Row className="home-exhibition-row">
          {featuredExhibitions.map((exhibition) => {
            return (
              <Col sm={12} md={6} lg={6} key={exhibition.name}>
                <button
                  className="custom-exhibition-link-button"
                  onClick={() => navigateToPage(exhibition.name)}
                >
                  <img
                    src={exhibition.imageUrl}
                    alt={exhibition.name}
                    className="img-fluid"
                  />
                </button>
                <div className="px-1">
                  <button
                    className="custom-exhibition-link-button"
                    onClick={() => navigateToPage(exhibition.name)}
                  >
                    <h5 className="mt-3">{exhibition.name}</h5>
                  </button>
                  <p className="text-black-50 custom-margin1">
                    {exhibition.description}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}

export default FeaturedExhibition;
