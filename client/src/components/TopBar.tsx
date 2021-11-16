import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const TopBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Review-Base</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/createReview">Create review</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopBar;
