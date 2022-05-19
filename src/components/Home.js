import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("a");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
  const inputHandler = (valueofinput) => {
    setQuery(valueofinput);
  };

  const fetchHandler = async (url) => {
    setLoading(true);
    try {
      const result = await fetch(url);
      const data = await result.json();
      setLoading(false);
      setNews(data.hits);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHandler(`${API_ENDPOINT}${query}`);
  }, [query]);

  if (loading) {
    return <div className="lds-hourglass"></div>;
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search for news..."
        onChange={(e) => inputHandler(e.target.value)}
      />

      <div className="hacker-search">
        {news.map((element) => {
          const { title, objectID, points, num_comments } = element;
          return (
            <Link
              to={`/news/${objectID}`}
              className="links"
              style={{ textDecoration: "none" }}
            >
              <div className="search-item">
                <div className="title">{title}</div>
                <div className="info">
                  <div className="author">{points} points</div>
                  <div className="num-comments">{num_comments} comments</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
