import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Typeahead } from "react-bootstrap-typeahead";
import remarkGfm from "remark-gfm";

import { Container, Col, Form, Tabs, Tab } from "react-bootstrap";

import { apiURI } from "../types";

const CreateReview = () => {
  const maxTitleLength = 100;
  const maxBodyLength = 65535;

  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);

  const [seclectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get(apiURI + "categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error(error));

    axios
      .get(apiURI + "tags")
      .then((res) => setTags(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <h1>Create your own review</h1>
      <Form>
        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            maxLength={maxTitleLength}
            placeholder="Your title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Form.Text className="text-muted">
            {maxTitleLength - title.length} characters left.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Typeahead
            id="tags-select"
            allowNew
            multiple
            newSelectionPrefix="Add a new tag: "
            onChange={setSelectedTags}
            options={tags.map((tag) => tag.name)}
            placeholder="Select tags"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Tabs className="mb-3">
            <Tab eventKey="edit" title="Edit">
              <Form.Control
                as="textarea"
                maxLength={maxBodyLength}
                placeholder="Your body"
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
                . {maxBodyLength - body.length} characters left.
              </Form.Text>
            </Tab>

            <Tab eventKey="preview" title="Preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </Tab>
          </Tabs>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default CreateReview;
