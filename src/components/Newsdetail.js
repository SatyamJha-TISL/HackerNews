import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const NewsDetail = () => {
  const { newsID } = useParams();
  const [data, setData] = useState([]);
  const API_NEW = `https://hn.algolia.com/api/v1/items/${newsID}`;

  const fetchData = async () => {
    const resp = await axios.get(API_NEW);
    console.log(resp.data);
    const { id, title, points, children } = resp.data;

    const comments = children.map((child) => {
      const string = child.text;

      return string;
    });
    const array = [title, points, comments];

    setData(array);
  };
  useEffect(() => {
    fetchData();
    return () => {};
  }, [newsID]);

  return (
    <div>
      <div> {newsID}</div>

      <ul className="comment-container">
        {data.map((details) => {
          return <li className="comment">{details}</li>;
        })}
      </ul>

      <Link to="/">Back to Home</Link>
    </div>
  );
};
export default NewsDetail;
