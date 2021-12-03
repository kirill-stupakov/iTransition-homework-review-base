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
import { Link, useNavigate } from "react-router-dom";

const TopBar = () => {
  const userObject = useContext(userContext) as user;
  const { backgroundColor, colorTheme } = useContext(
    themeContext
  ) as ThemeContext;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logOut = () => {
    axios.get(apiURI + "auth/logout", { withCredentials: true }).then((res) => {
      navigate("/");
    });
  };

  return (
    <Navbar
      sticky="top"
      expand="lg"
      className="mb-3 shadow-sm"
      variant={colorTheme}
      bg={backgroundColor}
    >
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          {t("topBar.reviewBase")}
        </Navbar.Brand>
        <ReviewSearchPanel />

        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse" className="justify-content-end">
          <Nav className="me-auto" navbarScroll>
            {userObject && (
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => navigate("/createReview/" + userObject.uuid)}
                >
                  {t("topBar.createReview")}
                </Nav.Link>
                {userObject.isAdmin ? (
                  <Nav.Link onClick={() => navigate("/adminPanel")}>
                    {t("topBar.adminPanel")}
                  </Nav.Link>
                ) : null}
              </Nav>
            )}
          </Nav>

          <Nav className="mb-auto">
            <Nav.Item>
              {userObject ? (
                <>
                  <Navbar.Text>
                    <Link to={"/users/" + userObject.uuid}>
                      {userObject.name}
                    </Link>
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
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
