import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../index.css"; // Custom styles for the hero section

function HeroSection() {
  return (
    <div className="hero-section text-center text-white">
      <div className="overlay"></div>
      <Container className="hero-content d-flex flex-column align-items-center justify-content-center">
        <h1 className="display-5 fw-bold">Unleash Your Inner Curator</h1>
        <p className="lead mt-3">
          Welcome to ArtQuest, a groundbreaking platform that empowers you to
          create personalized virtual exhibitions from the extensive collections
          of the world's leading museums and universities. Whether you're a
          researcher, student, or an art enthusiast, ArtQuest brings the art
          world to your fingertips.
        </p>
        <div className="mt-4">
          <Button href="#explore" variant="primary" size="lg" className="me-2">
            Start Your ArtQuest
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HeroSection;
