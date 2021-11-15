import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container, Form, Button } from "react-bootstrap";

import { apiURI } from "../types";

const CreateReview = () => {
  const maxTitleLength = 100;
  const maxBodyLength = 65535;

  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get(apiURI + "categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <h1>Create your own review</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select>
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
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            maxLength={maxBodyLength}
            placeholder="Your body"
            onChange={(event) => setBody(event.target.value)}
            style={{ height: "400px" }}
          />
          <Form.Text className="text-muted">
            Supports{" "}
            <a href="https://www.markdownguide.org" target="_blank">
              Markdown
            </a>
            . {maxBodyLength - body.length} characters left.
          </Form.Text>
        </Form.Group>
      </Form>
      <ReactMarkdown className="text-wrap" remarkPlugins={[remarkGfm]}>
        {body}
      </ReactMarkdown>
    </Container>
  );
};

export default CreateReview;
