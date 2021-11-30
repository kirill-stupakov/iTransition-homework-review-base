import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Container, Row, Col, Stack } from "react-bootstrap";

import TagCloud from "./TagCloud";
import ReviewCard from "../ReviewCard";
import { review, ThemeContext } from "../../types";
import { themeContext } from "../ThemeContext";
import { apiURI } from "../../constants";

const HomePage = () => {
  const [mostRated, setMostRated] = useState<review[]>([]);
  const [mostRecent, setMostRecent] = useState<review[]>([]);
  const { textColor } = useContext(themeContext) as ThemeContext;

  useEffect(() => {
    axios
      .get(`${apiURI}reviews/top/rating`)
      .then((res) => setMostRated(res.data))
      .catch((error) => console.log(error));

    axios
      .get(`${apiURI}reviews/top/id`)
      .then((res) => setMostRecent(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <TagCloud />
      <Row className={"text-" + textColor}>
        <Col lg>
          <h1>
            <i className="bi bi-bar-chart" /> Most rated reviews
          </h1>
          <Stack gap={3} className="my-3">
            {mostRated.map((review) => (
              <ReviewCard review={review} showAuthor key={review.id} />
            ))}
          </Stack>
        </Col>
        <Col lg>
          <h1>
            <i className="bi bi-clock" /> Most recent reviews
          </h1>
          <Stack gap={3} className="my-3">
            {mostRecent.map((review) => (
              <ReviewCard review={review} showAuthor key={review.id} />
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
