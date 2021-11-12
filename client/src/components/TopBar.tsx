import React from "react";
import { Container, Navbar } from "react-bootstrap";

const TopBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Review-Base</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TopBar;
