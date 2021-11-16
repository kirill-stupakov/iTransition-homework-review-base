import React, { useState } from "react";

interface Props {
  mark: number;
  onChange: (n: number) => void;
  max: number;
}

const Mark: React.FC<Props> = ({ max, onChange, mark }) => {
  const [selectedMark, setSelectedMark] = useState(mark);
  const [hover, sethover] = useState(false);

  return (
    <h3
      className={`opacity-${hover ? "75" : "100"}`}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => {
        sethover(false);
        setSelectedMark(mark);
      }}
    >
      {[...Array(max)].map((_, idx) => (
        <i
          key={idx}
          className={`mr-1 bi bi-star${idx <= selectedMark ? "-fill" : ""}`}
          onMouseEnter={() => setSelectedMark(idx)}
          onClick={() => onChange(idx)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </h3>
  );
};

export default Mark;
