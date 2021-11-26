import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { apiURI } from "../types";
import ReviewForm from "./ReviewForm";

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
            "Content-Type": "multipart/form-data",
          },
        })
      }
    />
  );
};

export default CreateReview;
