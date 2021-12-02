import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactWordcloud, { Word } from "react-wordcloud";

import { apiURI } from "../../constants";
import { Container, Spinner } from "react-bootstrap";

const TagCloud = () => {
  const [tags, setTags] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(apiURI + "tags")
      .then((res: any) => {
        setTags(res.data.map((t: any) => ({ text: t.name, value: t.count })));
        setIsLoading(false);
      })
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <div className="word-cloud">
      {isLoading && (
        <Container
          className="position-absolute d-flex justify-content-center align-items-center w-100"
          style={{ height: "20rem" }}
        >
          <Spinner animation="border" />
        </Container>
      )}
      <ReactWordcloud
        words={tags}
        options={{
          enableTooltip: false,
          rotationAngles: [0, 0],
          rotations: 1,
          padding: 2,
          deterministic: true,
          fontSizes: [20, 90],
          fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
        }}
      />
    </div>
  );
};

export default TagCloud;
