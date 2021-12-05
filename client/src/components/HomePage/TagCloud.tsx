import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactWordcloud from "react-d3-cloud";
import { Container, Spinner } from "react-bootstrap";
import * as d3 from "d3";

import { apiURI } from "../../constants";
import { word } from "../../types";
import { useTranslation } from "react-i18next";

const TagCloud = React.memo(() => {
  const [tags, setTags] = useState<word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const maxValue = d3.max(tags.map((tag) => tag.value)) as number;
  const valueScale = d3.scaleLinear().domain([0, maxValue]).range([5, 40]);

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
          style={{ height: 200 }}
        >
          <h2>
            {t("homePage.loadingTagCloud")} <Spinner animation="border" />
          </h2>
        </Container>
      )}
      <ReactWordcloud
        data={tags}
        padding={1}
        spiral="archimedean"
        font={`-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`}
        fontSize={(tag: word) => valueScale(tag.value)}
        rotate={0}
        height={160}
      />
    </div>
  );
});

export default TagCloud;
