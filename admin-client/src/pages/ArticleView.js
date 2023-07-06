import { useParams } from "react-router-dom";

import Comment from "../components/Comment";

import useArticle from "../hooks/useArticle";
import useComments from "../hooks/useComments";

const ArticleView = (props) => {
  const { articleId } = useParams();
  const { article, loading } = useArticle(articleId);
  const { comments, commentsLoading } = useComments(articleId);

  if (loading || commentsLoading) {
    return <div>Loading...</div>;
  }

  const commentList = comments.map((comment) => {
    return <Comment comment={comment} />;
  });

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full lg:w-4/6 bg-white p-10 px-20">
        <h1 className="text-5xl font-extrabold mb-2">{article.title}</h1>
        <p>
          By{" "}
          <span className="text-blue-500 font-bold">
            {article.author.first_name + " " + article.author.last_name}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">{article.date_formatted}</p>
        <p className="mt-10 text-lg text-gray-800 mb-10">{article.content}</p>
        <hr className="mb-10" />
        <h2 className="text-xl font-bold">Comments</h2>
        {comments.length < 1 ? (
          <p className="text-sm text-gray-700">This article has no comment.</p>
        ) : (
          commentList
        )}
      </div>
    </div>
  );
};

export default ArticleView;
