import React, { useContext, useState } from "react";
import { AsyncTypeahead, TypeaheadResult } from "react-bootstrap-typeahead";
import { review, ThemeContext } from "../../types";
import axios from "axios";
import { Badge, Container } from "react-bootstrap";
import { themeContext } from "../ThemeContext";
import { isoToReadableString, ratingToColor } from "../../functions";
import { apiURI } from "../../constants";

const ReviewSearchPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<review[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const { textColor } = useContext(themeContext) as ThemeContext;

  const handleSearch = (searchString: string) => {
    setIsLoading(true);
    axios.get(apiURI + "reviews/search/" + searchString).then((res) => {
      setOptions(res.data);
      setIsLoading(false);
    });
  };

  const renderChildren = (review: TypeaheadResult<review>) => (
    <Container className={"my-2 text-" + textColor}>
      <h5 className="text-wrap">
        <Badge bg={ratingToColor(review.rating)}>{review.rating}</Badge>{" "}
        <i className="bi bi-hash" />
        {review.category}: {review.title}
      </h5>
      <i className="bi bi-person" />{" "}
      <a
        href={"/users/" + review.author.uuid}
        className="text-reset"
        onClick={(event) => event.stopPropagation()}
      >
        {review.author.name}
      </a>{" "}
      <i className="bi bi-clock" /> {isoToReadableString(review.createdAt)}{" "}
      <i className="bi bi-bar-chart" /> {review.mark}/5{" "}
    </Container>
  );

  return (
    <div
      style={{
        width: isFocused ? "30rem" : "15rem",
        transition: "width 0.2s",
      }}
    >
      <AsyncTypeahead
        id="review-search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        filterBy={() => true}
        options={options}
        isLoading={isLoading}
        onSearch={handleSearch}
        labelKey={(option) => option.title}
        minLength={3}
        paginate
        placeholder="Search..."
        renderMenuItemChildren={renderChildren}
        className="text-primary"
      />
    </div>
  );
};

export default ReviewSearchPanel;
