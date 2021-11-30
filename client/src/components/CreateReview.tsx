import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import ReviewForm from "./ReviewForm";
import { apiURI } from "../constants";

const CreateReview = () => {
  const { authorUUID } = useParams();

  return (
    <ReviewForm
      getAuthor={() =>
        axios.get(apiURI + "users/info/" + authorUUID).then((res) => res.data)
      }
      actionName="Post"
      postFunction={(data) =>
        axios.post(apiURI + "reviews", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
    />
  );
};

export default CreateReview;
