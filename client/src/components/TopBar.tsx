import React, { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

import LoginButton from "./LoginButton";
import { myContext } from "./Context";

const TopBar = () => {
  const userObject = useContext<any>(myContext);

  console.log(userObject);

  return (
    <Navbar sticky="top" expand="md" className="mb-3" bg="light">
      <Container>
        <Navbar.Brand href="/">Review-Base</Navbar.Brand>
        {userObject && (
          <Nav className="me-auto">
            <Nav.Link href="/createReview">Create review</Nav.Link>
          </Nav>
        )}

        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse" className="justify-content-end">
          {userObject ? (
            <Navbar.Text>
              Logged in as{" "}
              <a href={"/users/" + userObject.uuid}>{userObject.name}</a>
            </Navbar.Text>
          ) : (
            <LoginButton />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
