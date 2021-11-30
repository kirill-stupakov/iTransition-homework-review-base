import React from "react";
import { Widget } from "@uploadcare/react-widget";

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
  console.log(imageGroupUUID);
  return (
    <Widget
      publicKey={process.env.REACT_APP_UPLOADCARE_CLIENT_ID!}
      value={imageGroupUUID}
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
