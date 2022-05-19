import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewsDetail = () => {
  const { newsID } = useParams();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const API_NEW = `https://hn.algolia.com/api/v1/items/${newsID}`;

  function parseHTML(html) {
    var t = document.createElement("template");
    t.innerHTML = html;
    return t.content;
  }

  const fetchData = async () => {
    const resp = await axios.get(API_NEW);
    const { title, points, children } = resp.data;
    const comments = children.map((child) => {
      const string = child.text;
      return string;
    });

    const array = [title, points];
    setData(array);
    setComment(comments);
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, [newsID]);

  return (
    <div className="comment-info">
      <div className="first-container">
        <Link to="/" className="link-home" style={{ textDecoration: "none" }}>
          Home
        </Link>
        <div className="details">
          {data.map((details) => {
            return <div className="info-details">{details}</div>;
          })}
        </div>
      </div>
      <div className="comment-wrapper">
        <h2> Comments </h2>
        <div className="comment-container">
          {comment.map((details) => {
            const documentFragment = parseHTML(details);

            return (
              <div className="comment">{documentFragment.textContent}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default NewsDetail;
