import React, { Component } from "react";
import errorpic from "../imagenotvailable.png";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } =
      this.props;

    return (
      <div>
        <div
          className="card my-3 center"
          
          id="newsCard"
        >
          
          <span className="position-absolute top--2 start-50 translate-middle badge rounded-pill bg-success">
            <span className="visually hidden">{source}</span>
          </span>
          <img src={!imgUrl ? errorpic : imgUrl} alt="..." />
          <div className="card-body">
            <h5 className="card-title">"{title}..."</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By <strong>{!author ? "Unknown" : author}</strong> updated on{" "}
                <strong>{new Date(date).toGMTString()}</strong>
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
