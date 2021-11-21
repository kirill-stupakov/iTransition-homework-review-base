import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Typeahead } from "react-bootstrap-typeahead";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";

import { Container, Form, Tabs, Tab, Row, Col, Button } from "react-bootstrap";
import Mark from "./Mark";

import { apiURI } from "../types";
import { myContext } from "./Context";

const EditReview = () => {
  const maxTitleLength = 100;
  const maxBodyLength = 65535;
  const { id } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const userObject = useContext(myContext);

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

  const imagesValidator = () =>
    images.every((image) => image.type.split("/")[0] === "image");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() && imagesValidator()) {
      setSendingReview(true);
      event.stopPropagation();
      const json = JSON.stringify({
        id,
        category: selectedCategory,
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
        .put(apiURI + "reviews/" + id, data, {
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

    axios.get(apiURI + "reviews/id=" + id).then((res) => {
      setAuthor(res.data.User);
      setSelectedCategory(res.data.category);
      setTitle(res.data.title);
      setBody(res.data.body);
      setMark(res.data.mark - 1);
      setSelectedTags(res.data.tags);
    });
  }, [id]);

  return (
    <Container>
      <h1>
        Edit review as{" "}
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
                type="text"
                required
                maxLength={maxTitleLength}
                placeholder="Your title"
                value={title}
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
              <Form.Select
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option value={category.name} key={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Typeahead
                id="tags-select"
                allowNew
                multiple
                newSelectionPrefix="Add a new tag: "
                onChange={setSelectedTags}
                selected={selectedTags}
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
          <Form.Label>Body</Form.Label>
          <Tabs className="mb-3">
            <Tab eventKey="edit" title="Edit">
              <Form.Control
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
                  href="https://www.markdownguide.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  Markdown
                </a>
                . {maxBodyLength - body.length} characters left
              </Form.Text>
            </Tab>

            <Tab eventKey="preview" title="Markdown preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </Tab>
          </Tabs>
        </Form.Group>
        <Button
          type="submit"
          variant={authorized && !!author ? "primary" : "danger"}
          disabled={!authorized || sendingReview || !author}
        >
          {sendingReview ? "Loading..." : "Save"}
        </Button>{" "}
        {authorized ? null : (
          <span className="text-danger">Please, log in to edit reviews. </span>
        )}
        {author ? null : (
          <span className="text-danger">Author UUID is incorrect. </span>
        )}
      </Form>
    </Container>
  );
};

export default EditReview;