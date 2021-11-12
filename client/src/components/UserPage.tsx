import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Container, Badge, Stack } from "react-bootstrap";

import { user, apiURI, isoToReadableString } from "../types";

const UserPage = () => {
  const { uuid } = useParams();
  const [user, setUser] = useState<user | null>(null);
  const [reviews, setReviews] = useState<any>();

  useEffect(() => {
    axios
      .get(apiURI + "users/" + uuid)
      .then((res: any) => setUser(res.data))
      .catch((error) => console.log(error));

    axios
      .get(apiURI + "reviews/byUser/" + uuid)
      .then((res: any) => setReviews(res.data))
      .catch((error) => console.log(error));
  }, [uuid]);

  console.log("user", user);
  console.log("reviews", reviews);

  return (
    user && (
      <Container className="py-3">
        <h1>
          {user.name}{" "}
          <Badge bg={user.isAdmin ? "danger" : "secondary"}>
            {user.isAdmin ? "admin" : "user"}
          </Badge>
        </h1>
        <h5 className="fw-light">
          Member since {isoToReadableString(user.createdAt)}
        </h5>
        <h5 className="fw-light">{user.karma} karma</h5>

        <Container>
          <Stack></Stack>
        </Container>
      </Container>
    )
  );
};

export default UserPage;