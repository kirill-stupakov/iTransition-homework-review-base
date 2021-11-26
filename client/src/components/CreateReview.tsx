import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Typeahead } from "react-bootstrap-typeahead";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";

import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Mark from "./Mark";

import { apiURI, ThemeContext } from "../types";
import { userContext } from "./UserContext";
import { themeContext } from "./ThemeContext";

const CreateReview = () => {
  const maxTitleLength = 100;
  const maxBodyLength = 65535;
  const { authorUUID } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const userObject = useContext(userContext);
  const { textColor, backgroundColor } = useContext(
    themeContext
  ) as ThemeContext;

  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mark, setMark] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const [validated, setValidated] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const [sendingReview, setSendingReview] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const imagesValidator = () =>
    images.every((image) => image.type.split("/")[0] === "image");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() && imagesValidator()) {
      setSendingReview(true);
      event.stopPropagation();
      const json = JSON.stringify({
        category: selectedCategory,
        authorUUID,
        title,
        body,
        mark: mark + 1,
        tags: selectedTags,
      });

      const blob = new Blob([json], {
        type: "application/json",
      });

      const data = new FormData();
      images.forEach((image) => data.append("files", image));
      data.append("document", blob);

      axios
        .post(apiURI + "reviews", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setSendingReview(false);
          if (res.status === 201) {
            window.location.href = "/reviews/id=" + res.data.id;
          } else {
            setAuthorized(false);
          }
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    setAuthorized(!!userObject);
  }, [userObject]);

  useEffect(() => {
    axios
      .get(apiURI + "categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(apiURI + "tags")
      .then((res) => setTags(res.data))
      .catch((error) => console.error(error));

    axios
      .get(apiURI + "users/info/" + authorUUID)
      .then((res) => setAuthor(res.data))
      .catch((error) => console.error(error));
  }, [authorUUID]);

  return (
    <Container className={"mb-3 text-" + textColor}>
      <h1>
        Post review as{" "}
        {author ? (
          <a className="text-reset" href={"/users/" + author.uuid}>
            {author.name}
          </a>
        ) : null}
      </h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={sendingReview ? undefined : handleSubmit}
      >
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className={"bg-" + backgroundColor + " text-" + textColor}
                type="text"
                required
                maxLength={maxTitleLength}
                placeholder="Your title"
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Text className="text-muted">
                {maxTitleLength - title.length} characters left
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={2} className="mb-3">
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Typeahead
                isValid={!!selectedCategory}
                className={"bg-" + backgroundColor + " text-" + textColor}
                id="category-select"
                labelKey={(category) => category.name}
                onChange={(selected) => setSelectedCategory(selected[0]?.name)}
                options={categories}
                placeholder="Select category"
              />
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Typeahead
                className={"bg-" + backgroundColor + " text-" + textColor}
                id="tags-select"
                allowNew
                multiple
                newSelectionPrefix="Add a new tag: "
                onChange={setSelectedTags}
                options={tags.map((tag) => tag.name)}
                placeholder="Select tags"
              />
              <Form.Text className="text-muted">Optional</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={3} xl={2} className="mb-3">
            <Form.Group>
              <Form.Label>Mark</Form.Label>
              <Mark mark={mark} onChange={setMark} max={5} />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group>
              <Form.Label>Images</Form.Label>
              <Form.Control
                className={"bg-" + backgroundColor + " text-" + textColor}
                type="file"
                isValid={images.length > 0 && imagesValidator()}
                accept="image/*"
                multiple
                onChange={(event: any) => setImages([...event.target.files])}
              />
              <Form.Text className="text-muted">
                Optional. Must be of valid types
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>
            Body{" "}
            <Button className="ml-2" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? (
                <>
                  <i className="bi bi-eye-slash" /> Edit
                </>
              ) : (
                <>
                  <i className="bi bi-eye-fill" /> Preview
                </>
              )}
            </Button>
          </Form.Label>
          {isPreview ? (
            <ReactMarkdown
              className="markdown-container"
              remarkPlugins={[remarkGfm]}
            >
              {body}
            </ReactMarkdown>
          ) : (
            <>
              <Form.Control
                className={"bg-" + backgroundColor + " text-" + textColor}
                as="textarea"
                required
                maxLength={maxBodyLength}
                placeholder="Your body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                style={{ height: "400px" }}
              />
              <Form.Text className="text-muted">
                Supports{" "}
                <a
                  className="text-muted"
                  href="https://www.markdownguide.org/cheat-sheet"
                  target="_blank"
                  rel="noreferrer"
                >
                  Markdown
                </a>
                . {maxBodyLength - body.length} characters left
              </Form.Text>
            </>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant={authorized && !!author ? "primary" : "danger"}
          disabled={!authorized || sendingReview || !author}
        >
          {sendingReview ? "Loading..." : "Post"}
        </Button>{" "}
        {authorized ? null : (
          <span className="text-danger">Please, log in to post reviews. </span>
        )}
        {author ? null : (
          <span className="text-danger">Author UUID is incorrect. </span>
        )}
      </Form>
    </Container>
  );
};

export default CreateReview;
