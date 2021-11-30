import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { themeContext } from "../ThemeContext";
import { ThemeContext } from "../../types";

const ThemeSwitchButton = () => {
  const { switchTheme, textColor, backgroundColor } = useContext(
    themeContext
  ) as ThemeContext;

  return (
    <Button onClick={switchTheme} className="ml-2" variant={textColor}>
      <i
        className={`bi bi-${backgroundColor === "light" ? "sun" : "moon"}-fill`}
      />
    </Button>
  );
};

export default ThemeSwitchButton;
