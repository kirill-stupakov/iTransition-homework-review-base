import React, { useState } from "react";
import { isoToReadableString, user } from "../types";
import { Button, Card, Col, Row } from "react-bootstrap";

interface Props {
  user: user;
  switchAdmin: () => void;
}

const UserCard: React.FC<Props> = ({ user, switchAdmin }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className={`border-0 ${
        hover ? "shadow-sm bg-opacity-25" : "bg-opacity-10"
      } bg-primary`}
      style={{ cursor: "pointer", transition: "0.3s" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = "/users/" + user.uuid)}
    >
      <Card.Body>
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
              {user.isAdmin ? "Downgrade" : "Upgrade"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserCard;