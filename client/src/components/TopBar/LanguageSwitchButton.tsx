import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Button } from "react-bootstrap";

const LanguageSwitchButton = () => {
  return (
    <Button onClick={() => {}} className="ml-2">
      <ReactCountryFlag
        countryCode="us"
        // style={{backgroundImage:}}
      />
    </Button>
  );
};

export default LanguageSwitchButton;
