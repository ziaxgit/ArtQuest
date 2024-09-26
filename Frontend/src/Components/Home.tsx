import { clearExhibitionsFromLocalStorage } from "../utils/exhibitionStorage";
import "../index.css";
import HeroSection from "./HeroSection";
import likePost from "../assets/museum-concept-illustration(1).png";
import browseArts from "../assets/museum-concept-illustration.png";
import { Container, Row, Col } from "react-bootstrap";
import FeaturedExhibition from "./FeaturedExhibition";
export default function Home() {
  return (
    <div>
      <HeroSection />

      <Container className="mt-4">
        <Row className="">
          <Col
            sm={12}
            md={6}
            className="m-auto custom-home-sm-screen
"
          >
            <a href="/explore" className="text-decoration-none text-black">
              <h5 className="mb-3">EXPLORE & COLLECT</h5>
            </a>
            <p className="text-black-50 custom-margin1">
              Dive into an extensive collection of artworks from renowned
              museums. Use filters and search tools to discover pieces that
              capture your imagination. Save your favorite pieces into custom
              collections and revisit them anytime.
            </p>
          </Col>
          <Col>
            <img
              src={browseArts}
              alt="Cleveland Museum of Art"
              className="img-fluid class-icon"
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-4 mb-5">
        <Row className="flex-row-reverse">
          <Col sm={12} md={6} className="m-auto custom-home-sm-screen">
            <a href="/exhibitions" className="text-decoration-none text-black">
              <h5 className="mb-3">EXHIBITIONS</h5>
            </a>
            <p className="text-black-50 custom-margin1">
              Create dynamic virtual exhibitions that showcase your favorite
              artworks. Add descriptions, arrange pieces to tell a story, and
              share your exhibition with others.
            </p>
          </Col>
          <Col>
            <img
              src={likePost}
              alt="Cleveland Museum of Art"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>

      <FeaturedExhibition />

      <div className="mt-5">
        FOR TESTING PURPOSES ONLY
        <button
          onClick={() => clearExhibitionsFromLocalStorage()}
          className="mb-3"
        >
          Reset Local Cache
        </button>
      </div>
    </div>
  );
}
