import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { review, apiURI } from "../types";

const ReviewPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState<review | null>(null);

  useEffect(() => {
    axios
      .get(apiURI + "reviews/" + id)
      .then((res) => setReview(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  console.log(review);

  return <div>REVIEW</div>;
};

export default ReviewPage;
