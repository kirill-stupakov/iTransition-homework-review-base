import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LanguageSwitchButton = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const switchLang = () => {
    i18n.changeLanguage(currentLanguage === "ru" ? "us" : "ru");
  };

  return (
    <Button
      onClick={switchLang}
      className="ml-2 p-0 overflow-hidden border-dark"
    >
      <img
        src={`/flags/${currentLanguage}.svg`}
        alt={currentLanguage}
        width="35rem"
      />
    </Button>
  );
};

export default LanguageSwitchButton;
