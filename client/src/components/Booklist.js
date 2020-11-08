import React from "react";
import { Col, Row } from "./Grid";

export function BookListItem({
  googleId,
  title,
  authors,
  description,
  href,
  pageCount,
  thumbnail,
  clickEvent,
  saved
}) {

  return (
    <li>

        <div>
          {!saved ? (
            <button
              className="btn"
              onClick={event => clickEvent(event, googleId, title, authors, description, href, pageCount, thumbnail)}>Save to Library</button>
          ) : (
              <button className="btn" onClick={event => clickEvent(event, googleId)}>Remove</button>
            )
          }
          <a className="btn" href={href} target="_blank" rel="noopener noreferrer">View Book Info</a>
        </div>

      <h4>{title}</h4>
      <h5>by {authors.length > 1 ? (authors.reduce((prev, curr) => [prev, ", ", curr])) : authors[0]}</h5>
      <Row>
        <div>
          <img src={thumbnail} alt={title} />
        </div>
        <Col>
          <p >{description}</p>
        </Col>
      </Row>

      {saved &&
        <div>
          <Col>
          <small>{pageCount} pages</small>
          </Col>
        </div>
      }

    </li>
  );
};

export function Booklist({ children }) {
    return (
      <ul>{children}</ul>
    );
  };