import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { isoToReadableString } from "../types";

interface Props {
  review: any;
  showAuthor?: boolean;
}

const ReviewCard: React.FC<Props> = ({ review, showAuthor = false }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      key={review.id}
      className={`border-0 ${
        hover ? "shadow-sm bg-opacity-25" : "bg-opacity-10"
      } ${review.rating >= 0 ? "bg-success" : "bg-danger"}`}
      style={{ cursor: "pointer", transition: "0.3s" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate("/reviews/id=" + review.id)}
    >
      <Card.Body>
        <Card.Title>
          <Badge bg={review.rating >= 0 ? "success" : "danger"}>
            {review.rating}
          </Badge>{" "}
          <i className="bi bi-hash" />
          {review.category}: {review.title}
        </Card.Title>
        <Card.Subtitle className="fw-light">
          {showAuthor && (
            <>
              <i className="bi bi-person-fill" />{" "}
              <a
                href={"/users/" + review.User.uuid}
                className="text-reset"
                onClick={(event) => event.stopPropagation()}
              >
                {review.User.name}
              </a>{" "}
            </>
          )}
          <i className="bi bi-clock" /> {isoToReadableString(review.createdAt)}{" "}
          <i className="bi bi-bar-chart-fill" /> {review.mark}/5{" "}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
