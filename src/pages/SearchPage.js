import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import Spinner from "../components/Spinner";
import { getFilteredArticles } from "../store/reducers/articlesReducer";

const SearchPage = () => {
  const defaultPage = Number(process.env.REACT_APP_DEFAULT_PAGE);
  const defaultPerPage = Number(process.env.REACT_APP_DEFAULT_PER_PAGE);
  const search = useLocation().search;
  const searchTerm = new URLSearchParams(search).get("searchTerm");
  const dispatch = useDispatch();
  const { filteredArticles, loading } = useSelector((state) => state.articles);
  const [page, setPage] = useState(defaultPage);
  const [order, setOrder] = useState("relevancy");

  useEffect(() => {
    dispatch(
      getFilteredArticles({ searchTerm, count: page * defaultPerPage, order })
    );
  }, [searchTerm, page, order]);

  const handleGetMoreArticles = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="text-end">
        <select
          className="select-box"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
          <option value="publishedAt">Published At</option>
        </select>
      </div>
      <div className="row gy-3">
        {loading && <Spinner />}
        {filteredArticles?.articles?.map((article, index) => (
          <div key={index} className="col-lg-3 col-12">
            <ArticleCard
              title={article.title}
              description={article.description}
              image={article.urlToImage}
              id={index}
              type={"filteredArticles"}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        {!!(page * defaultPerPage < filteredArticles?.totalResults) && (
          <button onClick={handleGetMoreArticles} className="load-button">
            LOAD MORE
          </button>
        )}
      </div>
    </>
  );
};

export default SearchPage;
