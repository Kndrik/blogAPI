import { useNavigate } from "react-router-dom";
import { decodeHtml } from "../Utilities";

const ArticleCard = (props) => {
  const contentPreview = props.article.content.slice(0, 100) + " ...";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/${props.article._id}`)}
      className="mb-3 p-3 box-border bg-white rounded-lg shadow-sm hover:shadow-md hover:cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-1">
          <div className="font-bold text-lg">
            {decodeHtml(props.article.title)}
          </div>
          {props.article.published ? (
            <div className="text-sm text-green-400">Published</div>
          ) : (
            <div className="text-sm text-orange-400">Not published</div>
          )}
        </div>
        <div className="mb-2">{decodeHtml(contentPreview)}</div>
      </div>
      <div>
        <div className="font-thin text-sm">
          {decodeHtml(props.article.author.first_name) +
            " " +
            decodeHtml(props.article.author.last_name)}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
