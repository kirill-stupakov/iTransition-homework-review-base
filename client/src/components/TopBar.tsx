import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import LoginButton from "./LoginButton";
import { myContext } from "./UserContext";
import axios from "axios";
import { apiURI } from "../types";
import ReviewSearchPanel from "./ReviewSearchPanel";

const TopBar = () => {
  const userObject = useContext<any>(myContext);

  const logOut = () => {
    axios.get(apiURI + "auth/logout", { withCredentials: true }).then((res) => {
      if (res.data.message === "done") {
        window.location.href = "/";
      }
    });
  };

  return (
    <Navbar sticky="top" expand="md" className="mb-3 shadow-sm" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">Review-Base</Navbar.Brand>
        <ReviewSearchPanel />
        {userObject && (
          <Nav className="me-auto">
            <Nav.Link href={"/createReview/" + userObject.uuid}>
              Create review
            </Nav.Link>
            {userObject.isAdmin ? (
              <Nav.Link href="/adminPanel">Admin panel</Nav.Link>
            ) : null}
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
