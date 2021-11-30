import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import LoginButton from "./LoginButton";
import { userContext } from "../UserContext";
import axios from "axios";
import { ThemeContext, user } from "../../types";
import ReviewSearchPanel from "./ReviewSearchPanel";
import { themeContext } from "../ThemeContext";
import ThemeSwitchButton from "./ThemeSwitchButton";
import LanguageSwitchButton from "./LanguageSwitchButton";
import { apiURI } from "../../constants";

const TopBar = () => {
  const userObject = useContext(userContext) as user;
  const { backgroundColor, colorTheme } = useContext(
    themeContext
  ) as ThemeContext;

  const logOut = () => {
    axios.get(apiURI + "auth/logout", { withCredentials: true }).then((res) => {
      window.location.href = "/";
    });
  };

  return (
    <Navbar
      sticky="top"
      expand="md"
      className="mb-3 shadow-sm"
      variant={colorTheme}
      bg={backgroundColor}
    >
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
          <ThemeSwitchButton />
          <LanguageSwitchButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
