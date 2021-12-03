import React, { useContext, useState } from "react";
import { ThemeContext, user } from "../../types";
import { Button, Card, Col, Row } from "react-bootstrap";
import { themeContext } from "../ThemeContext";
import { useTranslation } from "react-i18next";
import { isoToReadableString } from "../../functions";
import { useNavigate } from "react-router-dom";

interface Props {
  user: user;
  switchAdmin: () => void;
}

const UserCard: React.FC<Props> = ({ user, switchAdmin }) => {
  const [hover, setHover] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { textColor } = useContext(themeContext) as ThemeContext;

  return (
    <Card
      className={`border-0 ${
        hover ? "shadow-sm bg-opacity-25" : "bg-opacity-10"
      } bg-primary`}
      style={{ cursor: "pointer", transition: "0.3s" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate("/users/" + user.uuid)}
    >
      <Card.Body className={"text-" + textColor}>
        <Row>
          <Col>
            <Card.Title>
              <img
                src={"/icons/" + user.authService + ".svg"}
                alt={user.authService}
                style={{ width: "1.3rem", height: "1.3rem" }}
              />{" "}
              {user.name}
            </Card.Title>
            <Card.Subtitle className="fw-light">
              <i className="bi bi-clock" />{" "}
              {isoToReadableString(user.createdAt)}
            </Card.Subtitle>
          </Col>

          <Col className="d-flex justify-content-end align-items-center">
            <Button
              variant={user.isAdmin ? "danger" : "primary"}
              onClick={(event) => {
                event.stopPropagation();
                switchAdmin();
              }}
            >
              {user.isAdmin
                ? t("adminPanel.userCard.makeUser")
                : t("adminPanel.userCard.makeAdmin")}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
