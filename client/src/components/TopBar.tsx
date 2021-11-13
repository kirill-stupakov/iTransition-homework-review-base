import React from "react";
import { Container, Navbar } from "react-bootstrap";

const TopBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Review-Base</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TopBar;
