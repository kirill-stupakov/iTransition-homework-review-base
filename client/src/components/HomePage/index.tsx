import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Container, Row, Col, Stack } from "react-bootstrap";

import TagCloud from "./TagCloud";
import ReviewCard from "../ReviewCard";
import { review, ThemeContext } from "../../types";
import { themeContext } from "../ThemeContext";
import { apiURI } from "../../constants";
import { useTranslation } from "react-i18next";
import ReviewCardLoading from "../ReviewCardLoading";

const HomePage = () => {
  const [mostRated, setMostRated] = useState<review[]>();
  const [mostRecent, setMostRecent] = useState<review[]>();
  const { textColor } = useContext(themeContext) as ThemeContext;
  const { t } = useTranslation();

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

  const loadingReviewCards = [...Array(5)].map((index) => (
    <ReviewCardLoading key={index} />
  ));

  return (
    <Container>
      <TagCloud />
      <Row className={"text-" + textColor}>
        <Col lg>
          <h1>
            <i className="bi bi-bar-chart" /> {t("homePage.mostRatedReviews")}
          </h1>
          <Stack gap={3} className="my-3">
            {mostRated
              ? mostRated.map((review) => (
                  <ReviewCard review={review} showAuthor key={review.id} />
                ))
              : loadingReviewCards}
          </Stack>
        </Col>
        <Col lg>
          <h1>
            <i className="bi bi-clock" /> {t("homePage.mostRecentReviews")}
          </h1>
          <Stack gap={3} className="my-3">
            {mostRecent
              ? mostRecent.map((review) => (
                  <ReviewCard review={review} showAuthor key={review.id} />
                ))
              : loadingReviewCards}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
