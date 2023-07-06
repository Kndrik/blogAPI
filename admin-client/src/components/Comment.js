const Comment = (props) => {
  return (
    <div className="my-3">
      <h4 className="font-bold mb-1">
        {props.comment.author}{" "}
        <span className="text-sm text-gray-500 font-normal">
          - {props.comment.date_formatted}
        </span>
      </h4>
      <p className="text-md">{props.comment.content}</p>
      <hr className="mt-3" />
    </div>
  );
};

export default Comment;
