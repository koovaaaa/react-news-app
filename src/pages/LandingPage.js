import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../components/ArticleCard";
import Spinner from "../components/Spinner";
import { getTopArticles } from "../store/reducers/articlesReducer";

const LandingPage = () => {
  const defaultPage = Number(process.env.REACT_APP_DEFAULT_PAGE);
  const defaultPerPage = Number(process.env.REACT_APP_DEFAULT_PER_PAGE);
  const dispatch = useDispatch();
  const { topArticles, loading } = useSelector((state) => state.articles);
  const [page, setPage] = useState(defaultPage);

  useEffect(() => {
    dispatch(getTopArticles({ count: page * defaultPerPage }));
  }, [page]);

  const handleGetMoreArticles = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="row gy-3 ">
        {loading && <Spinner />}
        {topArticles?.articles?.map((article, index) => (
          <div key={index} className="col-lg-3 col-12">
            <ArticleCard
              title={article.title}
              image={article.urlToImage}
              description={article.description}
              id={index}
              type={"topArticles"}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        {!!(page * defaultPerPage < topArticles?.totalResults) && (
          <button onClick={handleGetMoreArticles} className="load-button">
            LOAD MORE
          </button>
        )}
      </div>
    </>
  );
};

export default LandingPage;
