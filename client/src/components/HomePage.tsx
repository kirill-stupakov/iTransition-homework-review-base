import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container, Row, Col, Stack } from "react-bootstrap";

import TagCloud from "./TagCloud";
import ReviewCard from "./ReviewCard";
import { review, apiURI } from "../types";

const HomePage = () => {
  const [mostRated, setMostRated] = useState<review[]>([]);
  const [mostRecent, setMostRecent] = useState<review[]>([]);

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
      <Row>
        <Col lg>
          <h1>Most rated reviews</h1>
          <Stack gap={3} className="my-3">
            {mostRated.map((review) => (
              <ReviewCard review={review} />
            ))}
          </Stack>
        </Col>
        <Col lg>
          <h1>Most recent reviews</h1>
          <Stack gap={3} className="my-3">
            {mostRecent.map((review) => (
              <ReviewCard review={review} />
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
