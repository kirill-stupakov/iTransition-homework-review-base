import React, { useContext } from "react";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";

import { userContext } from "../UserContext";
import { useTranslation } from "react-i18next";
import MainContent from "./MainContent";

const UserPage = () => {
  const { userObject } = useContext<any>(userContext);
  const { t } = useTranslation();
  const { uuid } = useParams();
  const isAuthorized =
    userObject && (userObject.uuid === uuid || userObject.isAdmin);

  return (
    <>
      {isAuthorized ? (
        <MainContent uuid={uuid!} />
      ) : (
        <Container>
          <h1 className="text-danger">{t("userPage.notAdmin")}</h1>
        </Container>
      )}
    </>
  );
};

export default UserPage;
