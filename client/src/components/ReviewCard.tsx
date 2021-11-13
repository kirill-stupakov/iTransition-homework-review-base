import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { isoToReadableString } from "../types";

interface Props {
  review: any;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      key={review.id}
      className={`shadow-sm bg-opacity-${hover ? "25" : "10"} ${
        review.rating >= 0
          ? "border-success bg-success"
          : "border-danger bg-danger"
      }`}
      style={{ cursor: "pointer", transition: "0.3s" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate("/reviews/" + review.id)}
    >
      <Card.Body>
        <Card.Title>
          <Badge bg={review.rating >= 0 ? "success" : "danger"}>
            {review.rating}
          </Badge>{" "}
          {review.title}
        </Card.Title>
        <Card.Subtitle className="fw-light">
          {review.category}, {isoToReadableString(review.createdAt)}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
