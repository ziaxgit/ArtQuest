import { Container, Button } from "react-bootstrap";
import "../index.css"; // Custom styles for the hero section
import heroImg from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/explore");
  };
  return (
    <div className="hero-section-container text-center mt-4">
      <Container>
        <div className="hero-text-div">
          <h1 className="text-uppercase">Unleash Your Inner Curator</h1>
          <p className="lead text-black-50">
            Welcome to ArtQuest, a unique platform that empowers you to create
            personalized virtual exhibitions from the extensive collections of
            the world's leading museums and universities. Whether you're a
            researcher, student, or an art enthusiast, ArtQuest brings the art
            world to your fingertips.
          </p>
          <div className="mt-4 hero-btn">
            <Button onClick={handleClick} variant="primary" className="me-2">
              Start Your ArtQuest
            </Button>
          </div>
        </div>
      </Container>
      <div className="hero-img-div">
        <img src={heroImg}></img>
      </div>
    </div>
  );
}

export default HeroSection;
