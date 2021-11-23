import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {
  Container,
  Badge,
  Stack,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";

import { user, apiURI, isoToReadableString, review } from "../types";
import ReviewCard from "./ReviewCard";
import { myContext } from "./Context";

const sortAttributes: { attribute: string; name: string }[] = [
  { attribute: "id", name: "Creation date" },
  { attribute: "mark", name: "Mark" },
  { attribute: "rating", name: "Rating" },
];
const sortModes: { mode: string; name: string }[] = [
  { mode: "DESC", name: "Descending" },
  { mode: "ASC", name: "Ascending" },
];

const UserPage = () => {
  const userObject = useContext<any>(myContext);

  const { uuid } = useParams();
  const [user, setUser] = useState<user | null>(null);
  const [karma, setKarma] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [gotFields, setGotFields] = useState(false);
  const [reviews, setReviews] = useState<review[]>([]);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(sortAttributes[0].attribute);
  const [sortMode, setSortMode] = useState(sortModes[0].mode);

  useEffect(() => {
    axios
      .get(apiURI + "users/" + uuid)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  }, [uuid]);

  useEffect(() => {
    axios
      .get(
        `${apiURI}reviews/byUser/${uuid}/${sortBy}/${sortMode}/${searchString}`
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
  }, [uuid, sortBy, sortMode, searchString, gotFields]);

  return user ? (
    <Container>
      <h1 className="fw-bold">
        {user.name}{" "}
        <Badge bg={user.isAdmin ? "primary" : "secondary"}>
          {user.isAdmin ? "admin" : "user"}
        </Badge>
      </h1>
      <h5 className="fw-light">
        Member since {isoToReadableString(user.createdAt)}
      </h5>
      <h5 className="fw-light">
        {reviewCount} reviews, {karma} karma
      </h5>
      <hr />

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Filter"
          onChange={(event) => setSearchString(event.target.value)}
        />
        <DropdownButton title="Sort by" id="user-page-sort-by">
          {sortAttributes.map((attr) => (
            <Dropdown.Item
              key={attr.name}
              active={sortBy === attr.attribute}
              onClick={() => setSortBy(attr.attribute)}
            >
              {attr.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton title="Ordering" id="user-page-sort-mode">
          {sortModes.map((mode) => (
            <Dropdown.Item
              key={mode.name}
              active={sortMode === mode.mode}
              onClick={() => setSortMode(mode.mode)}
            >
              {mode.name}
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
              onDelete={() => {
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
              }}
              onEdit={() => (window.location.href = "/editReview/" + review.id)}
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
