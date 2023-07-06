import { useParams } from "react-router-dom";

const ArticleView = (props) => {
  const { articleId } = useParams();
  return <div>Article view {articleId}</div>;
};

export default ArticleView;
