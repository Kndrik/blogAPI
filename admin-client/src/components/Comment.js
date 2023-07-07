import { useState } from "react";

import crossLogo from "../svgs/cross.svg";

import { deleteComment } from "../api";

const Comment = (props) => {
  const [hovering, setHovering] = useState(false);
  const [hide, setHide] = useState(false);

  const handleClickDelete = async () => {
    const articleId = props.comment.article;
    const commentId = props.comment._id;
    try {
      await deleteComment(articleId, commentId);
      setHide(true);
    } catch (err) {
      console.error("There was an error trying to delete the comment", err);
    }
  };

  if (hide) {
    return null;
  }

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="my-3 relative"
    >
      <h4 className="font-bold mb-1">
        {props.comment.author}{" "}
        <span className="text-sm text-gray-500 font-normal">
          - {props.comment.date_formatted}
        </span>
      </h4>
      <p className="text-md">{props.comment.content}</p>
      {hovering ? (
        <button
          onClick={handleClickDelete}
          className="absolute top-0 right-0 hover:cursor-pointer hover:text-slate-700"
        >
          <img src={crossLogo} alt="Delete logo" />
        </button>
      ) : null}
      <hr className="mt-3" />
    </div>
  );
};

export default Comment;
