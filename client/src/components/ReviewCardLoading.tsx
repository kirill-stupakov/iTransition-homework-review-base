import React, { useContext } from "react";
import { Card, Col, Placeholder, Row } from "react-bootstrap";
import { themeContext } from "./ThemeContext";
import { ThemeContext } from "../types";

const ReviewCardLoading = () => {
  const { textColor } = useContext(themeContext) as ThemeContext;

  return (
    <Card className="border-0 bg-opacity-10 bg-secondary">
      <Card.Body className={"text-" + textColor}>
        <Row>
          <Col>
            <Placeholder as={Card.Title} animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="wave">
              <Placeholder xs={10} />
            </Placeholder>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ReviewCardLoading;
