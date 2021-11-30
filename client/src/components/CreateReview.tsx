import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import ReviewForm from "./ReviewForm";
import { apiURI } from "../constants";
import { useTranslation } from "react-i18next";

const CreateReview = () => {
  const { authorUUID } = useParams();
  const { t } = useTranslation();

  return (
    <ReviewForm
      getAuthor={() =>
        axios.get(apiURI + "users/info/" + authorUUID).then((res) => res.data)
      }
      actionName={t("createReview.action")}
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
