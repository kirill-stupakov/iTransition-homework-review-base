import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Stack,
} from "react-bootstrap";
import { ThemeContext, user } from "../../types";
import axios from "axios";
import UserCard from "./UserCard";
import { themeContext } from "../ThemeContext";
import { useTranslation } from "react-i18next";
import { apiURI } from "../../constants";

const sortAttributes = ["createdAt", "name", "uuid", "isAdmin", "authService"];
const sortModes = ["asc", "desc"];

const AdminPanel = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState<user[]>([]);
  const [sortBy, setSortBy] = useState(sortAttributes[0]);
  const [sortMode, setSortMode] = useState(sortModes[0]);
  const [searchString, setSearchString] = useState("");

  const { textColor, backgroundColor } = useContext(
    themeContext
  ) as ThemeContext;

  const switchAdmin = (index: number, user: user) => {
    const newUsers = users;
    newUsers[index].isAdmin = !newUsers[index].isAdmin;
    setUsers(newUsers);
    axios.put(apiURI + "users/switchAdmin/" + user.uuid, null, {
      withCredentials: true,
    });
  };

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
      <h1 className={"mb-2 text-" + textColor}>{t("adminPanel.users")}</h1>
      <InputGroup className="mb-3">
        <FormControl
          className={"bg-" + backgroundColor + " text-" + textColor}
          placeholder={t("adminPanel.filter")}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <DropdownButton title={t("adminPanel.sortBy")} id="admin-panel-sort-by">
          {sortAttributes.map((attr) => (
            <Dropdown.Item
              key={attr}
              active={sortBy === attr}
              onClick={() => setSortBy(attr)}
            >
              {t("adminPanel.sortAttributes." + attr)}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          title={t("adminPanel.ordering")}
          id="admin-panel-sort-mode"
        >
          {sortModes.map((mode) => (
            <Dropdown.Item
              key={mode}
              active={sortMode === mode}
              onClick={() => setSortMode(mode)}
            >
              {t("adminPanel.sortOrder." + mode)}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>
      {users.length > 0 ? (
        <Stack gap={3} className="mt-3">
          {users.map((user, index) => (
            <UserCard
              user={user}
              switchAdmin={() => switchAdmin(index, user)}
            />
          ))}
        </Stack>
      ) : (
        <h4 className="text-muted">{t("adminPanel.noUsersFound")}</h4>
      )}
    </Container>
  );
};

export default AdminPanel;
