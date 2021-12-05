import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container, Badge } from "react-bootstrap";

import { review, ThemeContext, UserContext } from "../types";
import RatingButtons from "./ReviewForm/RatingButtons";
import { userContext } from "./UserContext";
import { themeContext } from "./ThemeContext";
import ImageViewer from "./ReviewForm/ImageViewer";
import {
  groupUUIDToArrayOfImages,
  isoToReadableString,
  ratingToColor,
} from "../functions";
import { apiURI } from "../constants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReviewPage = () => {
  const { userObject } = useContext(userContext) as UserContext;
  const { textColor } = useContext(themeContext) as ThemeContext;
  const { id } = useParams();
  const [review, setReview] = useState<review | null>(null);
  const [userRating, setUserRating] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { i18n } = useTranslation();

  const handleChange = (newRating: number) => {
    setReview({
      ...review!,
      rating: review!.rating - userRating + newRating,
    });
    setUserRating(newRating);

    axios
      .put(apiURI + "rating/" + id + "/" + newRating, null, {
        withCredentials: true,
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get(apiURI + "reviews/id=" + id)
      .then((res) => setReview(res.data))
      .catch((error) => console.error(error));

    axios
      .get(apiURI + "rating/" + id, { withCredentials: true })
      .then((res) => setUserRating(res.data.rating))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    review && (
      <Container className={"text-" + textColor}>
        <h1 className="fw-bold">
          {review.title}{" "}
          <Badge bg={ratingToColor(review.rating)}>{review.rating}</Badge>
          {userObject && (
            <RatingButtons userRating={userRating} onChange={handleChange} />
          )}
        </h1>
        <h5 className="fw-light">
          <i className="bi bi-person" />{" "}
          <Link className="text-reset" to={"/users/" + review.author.uuid}>
            {review.author.name}{" "}
          </Link>
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
        <ImageViewer images={groupUUIDToArrayOfImages(review.imageGroupUUID)} />
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          linkTarget="_blank"
          className="markdown-container"
        >
          {review.body}
        </ReactMarkdown>
      </Container>
    )
  );
};

export default ReviewPage;
