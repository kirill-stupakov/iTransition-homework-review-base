import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

import AuthButtons from "./AuthButtons";
import { myContext } from "./Context";

const TopBar = () => {
  const userObject = useContext(myContext);
  console.log(userObject);

  return (
    <Navbar expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Review-Base</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/createReview">Create review</Nav.Link>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="mr-2">Log in:</Navbar.Text>
          <AuthButtons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
