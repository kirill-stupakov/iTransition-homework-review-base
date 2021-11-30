import React, { useContext, useState } from "react";
import { Card, Badge, Row, Col, Button } from "react-bootstrap";

import { ThemeContext } from "../types";
import { themeContext } from "./ThemeContext";
import { isoToReadableString, ratingToColor } from "../functions";

interface Props {
  review: any;
  showAuthor?: boolean;
  showControls?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReviewCard: React.FC<Props> = ({
  review,
  showAuthor = false,
  showControls = false,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [hover, setHover] = useState(false);
  const { textColor } = useContext(themeContext) as ThemeContext;

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onEdit();
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Card
      key={review.id}
      className={`border-0 ${
        hover ? "shadow-sm bg-opacity-25" : "bg-opacity-10"
      } bg-${ratingToColor(review.rating)}`}
      style={{ cursor: "pointer", transition: "0.3s" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = "/reviews/id=" + review.id)}
    >
      <Card.Body className={"text-" + textColor}>
        <Row>
          <Col>
            <Card.Title>
              <Badge bg={ratingToColor(review.rating)}>{review.rating}</Badge>{" "}
              <i className="bi bi-hash" />
              {review.category}: {review.title}
            </Card.Title>
            <Card.Subtitle className="fw-light">
              {showAuthor && (
                <>
                  <i className="bi bi-person" />{" "}
                  <a
                    href={"/users/" + review.author.uuid}
                    className="text-reset"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {review.author.name}
                  </a>{" "}
                </>
              )}
              <i className="bi bi-clock" />{" "}
              {isoToReadableString(review.createdAt)}{" "}
              <i className="bi bi-bar-chart" /> {review.mark}/5{" "}
            </Card.Subtitle>
          </Col>
          {showControls ? (
            <Col
              md={2}
              className="d-flex justify-content-end align-items-center"
            >
              <Button variant="secondary" className="mr-3" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Col>
          ) : null}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
