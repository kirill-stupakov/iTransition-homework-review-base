import React, { useContext } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

import { apiURI, ThemeContext } from "../types";
import { themeContext } from "./ThemeContext";

const googleAuth = () => {
  window.location.href = apiURI + "auth/google";
};

const githubAuth = () => {
  window.location.href = apiURI + "auth/github";
};

const vkontakteAuth = () => {
  window.location.href = apiURI + "auth/vkontakte";
};

const imageSize = 20;

const authMethods = [
  { name: "Google", func: googleAuth },
  { name: "GitHub", func: githubAuth },
  { name: "VKontakte", func: vkontakteAuth },
];

const LoginButton = () => {
  const { textColor, backgroundColor } = useContext(
    themeContext
  ) as ThemeContext;

  return (
    <DropdownButton
      variant="primary"
      id="login-button"
      title="Log in"
      align="end"
    >
      {authMethods.map((method) => (
        <Dropdown.Item
          onClick={method.func}
          key={method.name}
          className={"py-2 bg-" + backgroundColor + " text-" + textColor}
        >
          <img
            src={"/icons/" + method.name.toLowerCase() + ".svg"}
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
