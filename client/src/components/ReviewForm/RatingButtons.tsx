import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  userRating: number;
  onChange: (newRating: number) => void;
}

const RatingButtons: React.FC<Props> = ({ userRating, onChange }) => {
  return (
    <>
      <Button
        variant="link"
        className={
          "ml-3 fs-2 p-0 text-danger opacity-" +
          (userRating >= 0 ? "50" : "100")
        }
        onClick={() => onChange(userRating === -1 ? 0 : -1)}
      >
        <i className="bi bi-hand-thumbs-down-fill" />
      </Button>
      <Button
        variant="link"
        className={
          "ml-3 fs-2 p-0 text-success opacity-" +
          (userRating <= 0 ? "50" : "100")
        }
        onClick={() => onChange(userRating === 1 ? 0 : 1)}
      >
        <i className="bi bi-hand-thumbs-up-fill" />
      </Button>
    </>
  );
};

export default RatingButtons;
