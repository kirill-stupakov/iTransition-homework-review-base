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
      onClick={() => navigate("/reviews/id/" + review.id)}
    >
      <Card.Body>
        <Card.Title>
          <Badge bg={review.rating >= 0 ? "success" : "danger"}>
            {review.rating}
          </Badge>{" "}
          {review.title}{" "}
          {showAuthor ? (
            <span className="fw-light fst-italic">({review.User?.name})</span>
          ) : null}
        </Card.Title>
        <Card.Subtitle className="fw-light">
          {review.category}, {isoToReadableString(review.createdAt)},{" "}
          {review.mark}/5
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
