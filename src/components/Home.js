import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("a");
  const [news, setNews] = useState([]);
  const [error, setError] = useState({ show: false, msg: "hy" });
  const [loading, setLoading] = useState(true);

  const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
  const inputHandler = (valueofinput) => {
    setQuery(valueofinput);
    console.log(query);
  };

  const fetchHandler = async (url) => {
    setLoading(true);
    try {
      const result = await fetch(url);
      const data = await result.json();
      console.log(data);
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
    return <div> Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => inputHandler(e.target.value)}
      />

      <div>
        {news.map((element) => {
          const { title, objectID } = element;
          return (
            <Link to={`/news/${objectID}`}>
              <p> {title} </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
