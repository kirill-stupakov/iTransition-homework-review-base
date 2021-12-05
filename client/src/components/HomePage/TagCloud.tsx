import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactWordcloud from "react-d3-cloud";
import { Container, Spinner } from "react-bootstrap";
import * as d3 from "d3";

import { apiURI } from "../../constants";
import { word } from "../../types";
import { useTranslation } from "react-i18next";
import { useMeasure } from "react-use";

const TagCloud = React.memo(() => {
  const [tags, setTags] = useState<word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const [ref, { width, height }] = useMeasure();

  const maxValue = d3.max(tags.map((tag) => tag.value)) as number;
  const valueScale = d3.scaleLinear().domain([0, maxValue]).range([15, 80]);

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
    <Container
      // @ts-ignore
      ref={ref}
      className="d-flex justify-content-center align-items-center w-100"
      style={{ height: 300 }}
    >
      {isLoading ? (
        <h2>
          {t("homePage.loadingTagCloud")} <Spinner animation="border" />
        </h2>
      ) : (
        <ReactWordcloud
          data={tags}
          padding={2}
          spiral="archimedean"
          font={`-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`}
          fontSize={(tag: word) => valueScale(tag.value)}
          rotate={0}
          height={height}
          width={width}
        />
      )}
    </Container>
  );
});

export default TagCloud;
