import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

import { apiURI } from "../types";

const googleAuth = () => {
  window.open(apiURI + "auth/google");
};

const githubAuth = () => {
  window.open(apiURI + "auth/github");
};

const twitterAuth = () => {
  window.open(apiURI + "auth/twitter");
};

const imageSize = 20;

const authMethods = [
  { name: "Google", func: googleAuth },
  { name: "GitHub", func: githubAuth },
  { name: "Twitter", func: twitterAuth },
];

const LoginButton = () => {
  return (
    <DropdownButton variant="secondary" id="login-button" title="Log in">
      {authMethods.map((method) => (
        <Dropdown.Item onClick={method.func} key={method.name}>
          <img
            src={"/" + method.name.toLowerCase() + ".svg"}
            alt={method.name}
            width={imageSize}
            height={imageSize}
            className="mr-1"
          />{" "}
          {method.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default LoginButton;
