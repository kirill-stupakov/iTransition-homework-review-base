import React from "react";
import { Button } from "react-bootstrap";

import { apiURI } from "../types";

const googleAuth = () => {
  window.open(apiURI + "auth/google");
};

const githubAuth = () => {};

const twitterAuth = () => {};

const imageSize = 20;

const authMethods = [
  { name: "Google", func: googleAuth },
  { name: "GitHub", func: githubAuth },
  { name: "Twitter", func: twitterAuth },
];

const AuthButtons = () => {
  return (
    <>
      {authMethods.map((method) => (
        <Button
          variant="outline-secondary"
          className="mx-1 px-2 py-1 d-flex justify-content-center align-items-center"
          onClick={method.func}
          key={method.name}
        >
          <img
            src={"/" + method.name.toLowerCase() + ".svg"}
            alt={method.name}
            width={imageSize}
            height={imageSize}
            className="mr-1"
          />{" "}
          {method.name}
        </Button>
      ))}
    </>
  );
};

export default AuthButtons;
