import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import LoginButton from "./LoginButton";
import { myContext } from "./Context";
import axios from "axios";
import { apiURI } from "../types";

const TopBar = () => {
  const userObject = useContext<any>(myContext);

  console.log(userObject);

  const logOut = () => {
    axios.get(apiURI + "auth/logout", { withCredentials: true }).then((res) => {
      if (res.data.message === "done") {
        window.location.href = "/";
      }
    });
  };

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
            <>
              <Navbar.Text>
                Logged in as{" "}
                <a href={"/users/" + userObject.uuid}>{userObject.name}</a>
              </Navbar.Text>
              <Button variant="danger" className="ml-2" onClick={logOut}>
                Log out
              </Button>
            </>
          ) : (
            <LoginButton />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
