import { Link } from "react-router-dom";
import "../styles/card.css";

const ArticleCard = ({ title, image, description, id, type }) => {
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;
  const typeOfArticle =
    type === "topArticles" ? "topArticles" : "filteredArticles";

  const handleIvalidUrlForImage = (e) => {
    e.target.onError = null;
    e.target.src = defaultImage;
  };

  return (
    <div className="card">
      <img
        className="card-img-top card-image"
        src={image ? image : defaultImage}
        alt="card_image"
        onError={handleIvalidUrlForImage}
      />
      <div className="card-body card-article">
        <h5 className="card-title mt-3 mb-3">{title}</h5>
        <p
          className="card-text card-description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Link className="card-button" to={`/${typeOfArticle}/${id}`}>
          READ FULL ARTICLE
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
