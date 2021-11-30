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
import { useTranslation } from "react-i18next";

const TopBar = () => {
  const userObject = useContext(userContext) as user;
  const { backgroundColor, colorTheme } = useContext(
    themeContext
  ) as ThemeContext;
  const { t } = useTranslation();

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
        <Navbar.Brand href="/">{t("topBar.reviewBase")}</Navbar.Brand>
        <ReviewSearchPanel />
        {userObject && (
          <Nav className="me-auto">
            <Nav.Link href={"/createReview/" + userObject.uuid}>
              {t("topBar.createReview")}
            </Nav.Link>
            {userObject.isAdmin ? (
              <Nav.Link href="/adminPanel">{t("topBar.adminPanel")}</Nav.Link>
            ) : null}
          </Nav>
        )}

        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse" className="justify-content-end">
          {userObject ? (
            <>
              <Navbar.Text>
                {t("topBar.loggedInAs")}{" "}
                <a href={"/users/" + userObject.uuid}>{userObject.name}</a>
              </Navbar.Text>
              <Button variant="danger" className="ml-2" onClick={logOut}>
                {t("topBar.logOut")}
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
