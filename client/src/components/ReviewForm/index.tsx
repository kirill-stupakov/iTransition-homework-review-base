import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Mark from "./Mark";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { themeContext } from "../ThemeContext";
import {
  apiURI,
  groupUUIDToArrayOfImages,
  tag,
  ThemeContext,
  user,
} from "../../types";
import axios from "axios";
import { userContext } from "../UserContext";
import ImageUploadWidget from "./ImageUploadWidget";
import ImageViewer from "./ImageViewer";

interface Props {
  getAuthor: () => Promise<any>;
  initialTitle?: string;
  initialSelectedCategory?: string;
  initialSelectedTags?: string[];
  initialMark?: number;
  initialBody?: string;
  initialImageGroupUUID?: string;
  postFunction: (data: any) => Promise<any>;
  actionName: string;
}

const ReviewForm: React.FC<Props> = ({
  getAuthor,
  initialTitle = "",
  initialSelectedCategory = "",
  initialSelectedTags = [],
  initialMark = 3,
  initialBody = "",
  initialImageGroupUUID,
  postFunction,
  actionName,
}) => {
  const maxTitleLength = 100;
  const maxBodyLength = 65535;
  const { textColor, backgroundColor } = useContext(
    themeContext
  ) as ThemeContext;
  const userObject = useContext(userContext);

  const [author, setAuthor] = useState<user | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<tag[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialSelectedCategory
  );
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [mark, setMark] = useState(initialMark);
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);
  const [imageGroupUUID, setImageGroupUUID] = useState(initialImageGroupUUID);

  const [authorized, setAuthorized] = useState(true);
  const [sendingReview, setSendingReview] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const formIsValid = () => {
    return body && title && selectedCategory && author;
  };
  console.log(imageGroupUUID);
  console.log(initialImageGroupUUID);

  const decideErrorMessage = () => {
    if (authorized) {
      if (author) {
        if (formIsValid()) {
          return null;
        }
        return "Please, fill all required fields";
      }
      return "Author UUID is incorrect";
    }
    return "Please, log in to " + actionName.toLowerCase() + " reviews.";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formIsValid()) {
      setSendingReview(true);
      event.stopPropagation();
      const review = {
        category: selectedCategory,
        authorUUID: author!.uuid,
        title,
        body,
        imageGroupUUID,
        mark: mark + 1,
        tags: selectedTags,
      };

      postFunction(review).then((res) => {
        setSendingReview(false);
        if (res.status === 201) {
          window.location.href = "/reviews/id=" + res.data.id;
        } else {
          setAuthorized(false);
        }
      });
    }
  };

  useEffect(() => {
    axios.get(apiURI + "categories").then((res) => {
      setCategories(res.data);
    });

    axios.get(apiURI + "tags").then((res) => setTags(res.data));
  }, []);

  useEffect(() => {
    getAuthor().then((res) => setAuthor(res));
  }, [getAuthor]);

  useEffect(() => {
    setAuthorized(!!userObject);
  }, [userObject]);

  return (
    <Container className={"mb-3 text-" + textColor}>
      <h1>
        {actionName} review as{" "}
        {author ? (
          <a className="text-reset" href={"/users/" + author.uuid}>
            {author.name}
          </a>
        ) : null}
      </h1>
      <Form onSubmit={sendingReview ? undefined : handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className={"bg-" + backgroundColor + " text-" + textColor}
                type="text"
                maxLength={maxTitleLength}
                placeholder="Your title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Text className="text-muted">
                Required. {maxTitleLength - title.length} characters left
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={2} className="mb-3">
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Typeahead
                className={"bg-" + backgroundColor + " text-" + textColor}
                id="category-select"
                selected={Array.of(selectedCategory)}
                onChange={(selected) => setSelectedCategory(selected[0])}
                options={categories}
                placeholder="Select category"
              />
              <Form.Text className="text-muted">Required</Form.Text>
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
                selected={selectedTags}
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
              <br />
              <ImageUploadWidget
                enabled={authorized}
                imageGroupUUID={imageGroupUUID}
                setImageGroupUUID={setImageGroupUUID}
              />
              <Form.Text className="text-muted">
                Optional. Must be of valid types
              </Form.Text>
            </Form.Group>
          </Col>
          <Col className="mb-3 d-flex align-items-center">
            <ImageViewer images={groupUUIDToArrayOfImages(imageGroupUUID)} />
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
                maxLength={maxBodyLength}
                placeholder="Your body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                style={{ height: "400px" }}
              />
              <Form.Text className="text-muted">
                Required. Supports{" "}
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
          variant={authorized && formIsValid() ? "primary" : "danger"}
          disabled={!authorized || sendingReview || !formIsValid()}
          className="mr-2"
        >
          {sendingReview ? "Loading..." : actionName}
        </Button>
        <span className="text-danger">{decideErrorMessage()}</span>
      </Form>
    </Container>
  );
};

export default ReviewForm;
