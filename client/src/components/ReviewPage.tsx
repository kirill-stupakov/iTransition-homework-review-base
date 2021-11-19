import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container, Badge } from "react-bootstrap";

import { review, apiURI, isoToReadableString, ratingToColor } from "../types";

const ReviewPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState<review | null>(null);

  useEffect(() => {
    axios
      .get(apiURI + "reviews/id=" + id)
      .then((res) => setReview(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  console.log(review);

  return (
    review && (
      <Container>
        <h1 className="fw-bold">
          {review.title}{" "}
          <Badge bg={ratingToColor(review.rating, 10)}>{review.rating}</Badge>
        </h1>
        <h5 className="fw-light">
          <i className="bi bi-person" />{" "}
          <a className="text-reset" href={"/users/" + review.authorUUID}>
            {review.User?.name}{" "}
          </a>
        </h5>
        <h5 className="fw-light">
          <i className="bi bi-clock" /> {isoToReadableString(review.createdAt)},{" "}
          <i className="bi bi-bar-chart" /> {review.mark}/5
        </h5>

        <h5 className="fw-light">
          <i className="bi bi-tags" />{" "}
          {review.tags?.map((tag) => (
            <Badge
              key={tag}
              className="bg-primary bg-opacity-10 text-primary fw-normal p-2 mx-1"
            >
              {tag}
            </Badge>
          ))}
        </h5>
        <hr />

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{review.body}</ReactMarkdown>
      </Container>
    )
  );
};

export default ReviewPage;
