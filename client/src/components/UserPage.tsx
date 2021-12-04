import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import {
  Container,
  Badge,
  Stack,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";

import { user, review, ThemeContext } from "../types";
import ReviewCard from "./ReviewCard";
import { userContext } from "./UserContext";
import { themeContext } from "./ThemeContext";
import { isoToReadableString } from "../functions";
import { apiURI } from "../constants";
import { useTranslation } from "react-i18next";

const sortAttributes = ["id", "mark", "rating"];
const sortModes = ["desc", "asc"];

const UserPage = () => {
  const { userObject } = useContext<any>(userContext);
  const { textColor, backgroundColor } = useContext(
    themeContext
  ) as ThemeContext;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { uuid } = useParams();
  const [user, setUser] = useState<user | null>(null);
  const [karma, setKarma] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [gotFields, setGotFields] = useState(false);
  const [reviews, setReviews] = useState<review[]>([]);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(sortAttributes[0]);
  const [sortMode, setSortMode] = useState(sortModes[0]);

  useEffect(() => {
    axios
      .get(apiURI + "users/profile/" + uuid, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  }, [uuid]);

  useEffect(() => {
    if (userObject && (userObject.uuid === uuid || userObject.isAdmin)) {
      axios
        .get(
          `${apiURI}reviews/byUser/${uuid}/${sortBy}/${sortMode}/${searchString}`,
          { withCredentials: true }
        )
        .then((res) => {
          setReviews(res.data);
          if (!gotFields) {
            setKarma(
              res.data.reduce(
                (prev: number, curr: review) => prev + curr.rating,
                0
              )
            );
            setReviewCount(res.data.length);
            setGotFields(true);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [uuid, sortBy, sortMode, searchString, gotFields, userObject]);

  const handleDelete = (review: review, index: number) => {
    axios
      .delete(apiURI + "reviews/" + review.id, {
        withCredentials: true,
      })
      .then((res) => {
        setReviews(reviews.filter((_, ind) => ind !== index));
        setKarma(karma - review.rating);
        setReviewCount(reviewCount - 1);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (review: review) => navigate("/editReview/" + review.id);

  return user ? (
    <Container className={"text-" + textColor}>
      <h1 className="fw-bold">
        {user.name}{" "}
        <Badge bg={user.isAdmin ? "primary" : "secondary"}>
          {user.isAdmin ? t("userPage.admin") : t("userPage.user")}
        </Badge>
      </h1>
      <h5 className="fw-light">
        {t("userPage.memberSince")} {isoToReadableString(user.createdAt)}
      </h5>
      <h5 className="fw-light">
        {reviewCount} {t("userPage.reviews")}, {karma} {t("userPage.karma")}
      </h5>
      <hr />

      <InputGroup className="mb-3">
        <FormControl
          className={"text-" + textColor + " bg-" + backgroundColor}
          placeholder={t("userPage.filter")}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <DropdownButton title={t("userPage.sortBy")} id="user-page-sort-by">
          {sortAttributes.map((attr) => (
            <Dropdown.Item
              key={attr}
              active={sortBy === attr}
              onClick={() => setSortBy(attr)}
            >
              {t("userPage.sortAttributes." + attr)}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton title={t("userPage.ordering")} id="user-page-sort-mode">
          {sortModes.map((mode) => (
            <Dropdown.Item
              key={mode}
              active={sortMode === mode}
              onClick={() => setSortMode(mode)}
            >
              {t("userPage.sortOrder." + mode)}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>

      {reviews.length ? (
        <Stack gap={3} className="mt-3">
          {reviews.map((review: any, index) => (
            <ReviewCard
              showControls={
                userObject && (userObject.isAdmin || userObject.uuid === uuid)
              }
              review={review}
              key={review.id}
              onDelete={() => handleDelete(review, index)}
              onEdit={() => handleEdit(review)}
            />
          ))}
        </Stack>
      ) : (
        <h4 className="text-muted">No reviews found</h4>
      )}
    </Container>
  ) : (
    <Container>
      <h1 className="text-danger">No privileges to see this user's page</h1>
    </Container>
  );
};

export default UserPage;
