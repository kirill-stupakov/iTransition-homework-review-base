import React, { useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Stack,
} from "react-bootstrap";
import { apiURI, user } from "../types";
import axios from "axios";
import UserCard from "./UserCard";

const sortAttributes: { attribute: string; name: string }[] = [
  { attribute: "createdAt", name: "Creation date" },
  { attribute: "name", name: "Name" },
  { attribute: "uuid", name: "UUID" },
  { attribute: "isAdmin", name: "Privileges" },
  { attribute: "authService", name: "Auth service" },
];
const sortModes: { mode: string; name: string }[] = [
  { mode: "DESC", name: "Descending" },
  { mode: "ASC", name: "Ascending" },
];

const AdminPanel = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [sortBy, setSortBy] = useState("uuid");
  const [sortMode, setSortMode] = useState("DESC");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    axios
      .get(`${apiURI}users/${sortBy}/${sortMode}/${searchString}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, [sortBy, sortMode, searchString]);

  return (
    <Container>
      <h1 className="mb-2">Users</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Filter"
          onChange={(event) => setSearchString(event.target.value)}
        />
        <DropdownButton title="Sort by" id="admin-panel-sort-by">
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
        <DropdownButton title="Ordering" id="admin-panel-sort-mode">
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
      {users.length > 0 ? (
        <Stack gap={3} className="mt-3">
          {users.map((user, index) => (
            <UserCard
              user={user}
              switchAdmin={() =>
                axios
                  .put(apiURI + "users/switchAdmin/" + user.uuid, null, {
                    withCredentials: true,
                  })
                  .then((res) =>
                    setUsers(
                      users.map((usr, idx) =>
                        idx === index ? { ...usr, isAdmin: !usr.isAdmin } : usr
                      )
                    )
                  )
              }
            />
          ))}
        </Stack>
      ) : (
        <h4 className="text-muted">No users found</h4>
      )}
    </Container>
  );
};

export default AdminPanel;
