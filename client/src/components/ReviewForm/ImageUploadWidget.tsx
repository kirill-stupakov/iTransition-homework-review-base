import React from "react";
import { Locale, Widget } from "@uploadcare/react-widget";
import { useTranslation } from "react-i18next";

interface Props {
  imageGroupUUID?: string;
  setImageGroupUUID: (uuid?: string) => void;
  enabled?: boolean;
}

const ImageUploadWidget: React.FC<Props> = ({
  setImageGroupUUID,
  imageGroupUUID,
  enabled = true,
}) => {
  const { i18n } = useTranslation();

  return (
    <Widget
      publicKey={process.env.REACT_APP_UPLOADCARE_CLIENT_ID!}
      value={imageGroupUUID}
      locale={i18n.language as Locale}
      multiple
      imagesOnly
      crop="free, 16:9, 3:2, 4:3, 1:1"
      onChange={(fileInfo) => setImageGroupUUID(fileInfo.uuid || undefined)}
      validators={[
        () => {
          if (!enabled) throw new Error("You are not authorized");
        },
      ]}
    />
  );
};

export default ImageUploadWidget;
