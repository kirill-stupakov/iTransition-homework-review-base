import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import { apiURI } from "../types";
import ReviewForm from "./ReviewForm";

const EditReview = () => {
  const { id } = useParams();

  const [author, setAuthor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mark, setMark] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    axios.get(apiURI + "reviews/id=" + id).then((res) => {
      console.log(res.data);
      setSelectedCategory(res.data.category);
      setTitle(res.data.title);
      setBody(res.data.body);
      setMark(res.data.mark - 1);
      setSelectedTags(res.data.tags);
      setAuthor(res.data.author);
    });
  }, [id]);

  console.log(apiURI + "reviews/" + id);

  return (
    author && (
      <ReviewForm
        getAuthor={() => Promise.resolve(author)}
        postFunction={(data) =>
          axios.put(apiURI + "reviews/" + id, data, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        }
        actionName="Edit"
        initialTitle={title}
        initialSelectedCategory={selectedCategory!}
        initialSelectedTags={selectedTags}
        initialMark={mark}
        initialBody={body}
      />
    )
  );
};

export default EditReview;
