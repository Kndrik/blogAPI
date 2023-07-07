import { useParams, useNavigate } from "react-router-dom";

import Comment from "../components/Comment";

import useArticle from "../hooks/useArticle";
import useComments from "../hooks/useComments";

import { deleteArticle } from "../api";

import { useState } from "react";

const ArticleView = (props) => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { article, loading } = useArticle(articleId);
  const { comments, commentsLoading } = useComments(articleId);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (loading || commentsLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    await deleteArticle(articleId);
    navigate("/dashboard");
  };

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
        <button className="mr-1 p-3 rounded-lg bg-blue-600 text-white w-24 hover:cursor-pointer hover:bg-blue-500">
          Edit
        </button>
        {confirmDelete ? (
          <button
            onClick={handleDelete}
            className="mb-4 mr-1 p-3 rounded-lg bg-red-600 text-white hover:cursor-pointer hover:bg-red-500"
          >
            Confirm delete
          </button>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="mb-4 mr-1 p-3 rounded-lg bg-red-500 text-white w-24 hover:cursor-pointer hover:bg-red-400"
          >
            Delete
          </button>
        )}
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
