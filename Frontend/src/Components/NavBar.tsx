import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      sticky="top"
      bg="dark"
      data-bs-theme="dark"
      expand="md"
      expanded={expanded}
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand className="fs-1" href="/">
          ArtQuest
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse
          className="justify-content-center fs-5"
          id="basic-navbar-nav"
        >
          <Nav className="ms-auto" style={{ textAlign: "center" }}>
            <Nav.Link as={NavLink} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/explore" onClick={handleNavClick}>
              Explore
            </Nav.Link>
            <Nav.Link as={NavLink} to="/collections" onClick={handleNavClick}>
              Collections
            </Nav.Link>
            <Nav.Link as={NavLink} to="/exhibitions" onClick={handleNavClick}>
              Exhibitions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
