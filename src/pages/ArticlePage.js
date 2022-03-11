import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/article.css";

const ArticlePage = () => {
  const { articleType, id } = useParams();
  const { articles } = useSelector((state) => state.articles[articleType]);
  const [article] = articles?.filter((article, index) => index === Number(id));
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;

  const dateFormat = (date, format = "en-Latn-US", extras = {}) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      ...extras,
    };

    return date ? new Date(date).toLocaleDateString(format, options) : null;
  };

  return (
    <div className="article-container">
      <div className="row">
        <h1>{article.title}</h1>
        <p className="article-info m-0">
          By <span>{article.author}</span>, {article.source.name}
        </p>
        <p className="article-info ">
          Published at {dateFormat(article.publishedAt)}
        </p>
        <div className="col-md-6 col-12">
          <img
            className="article-image"
            src={article.urlToImage ? article.urlToImage : defaultImage}
            alt="article_image"
          />
        </div>
        <div className="col-md-6 col-12">
          <p
            className="article-description"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
          <p>{article.content}</p>
        </div>
        <div className="text-md-center"></div>
      </div>
    </div>
  );
};

export default ArticlePage;
