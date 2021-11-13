import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {
  Container,
  Badge,
  Stack,
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  ButtonGroup,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
} from "react-bootstrap";

import { user, apiURI, isoToReadableString } from "../types";
import ReviewCard from "./ReviewCard";

const UserPage = () => {
  const sortAttributes: { attribute: string; name: string }[] = [
    { attribute: "id", name: "Creation date" },
    { attribute: "mark", name: "Mark" },
    { attribute: "rating", name: "Rating" },
  ];
  const sortModes: { mode: string; name: string }[] = [
    { mode: "DESC", name: "Descending" },
    { mode: "ASC", name: "Ascending" },
  ];

  const { uuid } = useParams();
  const [user, setUser] = useState<user | null>(null);
  const [reviews, setReviews] = useState<any>([]);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(sortAttributes[0].attribute);
  const [sortMode, setSortMode] = useState(sortModes[0].mode);

  const fetchReviews = () => {
    axios
      .get(
        `${apiURI}reviews/byUser/${uuid}/${sortBy}/${sortMode}/${searchString}`
      )
      .then((res: any) => setReviews(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(apiURI + "users/" + uuid)
      .then((res: any) => setUser(res.data))
      .catch((error) => console.log(error));

    fetchReviews();
  }, [uuid]);

  return (
    user && (
      <Container>
        <h1>
          {user.name}{" "}
          <Badge bg={user.isAdmin ? "primary" : "secondary"}>
            {user.isAdmin ? "admin" : "user"}
          </Badge>
        </h1>
        <h5 className="fw-light">
          Member since {isoToReadableString(user.createdAt)}
        </h5>
        <h5 className="fw-light">
          {user.reviews} reviews, {user.karma} karma
        </h5>
        <hr />

        <InputGroup className="mb-3">
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder="Filter"
            onChange={(event) => setSearchString(event.target.value)}
          />
          <DropdownButton
            title="Sort by"
            variant="outline-secondary"
            id="input-group-dropdown-1"
          >
            {sortAttributes.map((attr) => (
              <Dropdown.Item
                active={sortBy === attr.attribute}
                onClick={() => setSortBy(attr.attribute)}
              >
                {attr.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            title="Ordering"
            variant="outline-secondary"
            id="input-group-dropdown-2"
          >
            {sortModes.map((mode) => (
              <Dropdown.Item
                active={sortMode === mode.mode}
                onClick={() => setSortBy(mode.mode)}
              >
                {mode.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <Button onClick={fetchReviews}>Search</Button>
        </InputGroup>

        <Stack gap={3} className="mt-3">
          {reviews.map((review: any) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </Stack>
      </Container>
    )
  );
};

export default UserPage;
