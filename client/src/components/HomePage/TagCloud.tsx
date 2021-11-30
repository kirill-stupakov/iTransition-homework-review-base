import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactWordcloud, { Word } from "react-wordcloud";

import { apiURI } from "../../constants";

const TagCloud = () => {
  const [tags, setTags] = useState<Word[]>([]);

  useEffect(() => {
    axios
      .get(apiURI + "tags")
      .then((res: any) =>
        setTags(res.data.map((t: any) => ({ text: t.name, value: t.count })))
      )
      .catch((error: any) => console.log(error));
  }, []);

  return (
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
  );
};

export default TagCloud;