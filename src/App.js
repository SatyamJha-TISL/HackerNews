import "./styles.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NewsDetail from "./components/Newsdetail";
import PageNotFound from "./components/Pagenotfound";
export default function App() {
  return (
    <div className="App">
      <h1 className="heading">Hacker news </h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/news/:newsID" element={<NewsDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
