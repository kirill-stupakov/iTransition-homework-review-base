import React, { createContext, useEffect, useState } from "react";

import { colorTheme } from "../types";

export const themeContext = createContext({});
const UserContext = (props: any) => {
  const [colorTheme, setColorTheme] = useState<colorTheme>("light");
  const [backgroundColor, setBackgroundColor] = useState("light");
  const [textColor, setTextColor] = useState("dark");

  const switchTheme = () =>
    setColorTheme(colorTheme === "light" ? "dark" : "light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setColorTheme("dark");
    else localStorage.setItem("theme", "light");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", colorTheme);
    setBackgroundColor(colorTheme);
    setTextColor(colorTheme === "light" ? "dark" : "light");
    document.body.classList.remove(
      "bg-" + (colorTheme === "dark" ? "white" : "dark")
    );
    document.body.classList.add(
      "bg-" + (colorTheme === "dark" ? "dark" : "white")
    );
  }, [colorTheme]);

  return (
    <themeContext.Provider
      value={{ switchTheme, backgroundColor, textColor, colorTheme }}
    >
      {props.children}
    </themeContext.Provider>
  );
};

export default UserContext;
