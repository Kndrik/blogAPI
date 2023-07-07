import { useState } from "react";

import { createArticle } from "../api";

import { useNavigate } from "react-router-dom";

const NewArticleForm = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        content,
        published,
      };
      const result = await createArticle(data);
      navigate(`/dashboard/${result.data.articleId}`);
    } catch (err) {
      console.error("There was an error creating the article", err);
    }
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full lg:w-4/6 bg-white p-10 px-20 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mt-4">New Article</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-md font-medium text-s-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block font-bold border border-gray-300 text-sm rounded-lg w-full p-2.5"
              placeholder="Write your title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Content
            </label>
            <textarea
              type="textarea"
              id="content"
              rows="40"
              className="block border border-gray-300 text-sm rounded-lg w-full p-2.5"
              placeholder="Write your article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(!published)}
            />
            <label
              htmlFor="published"
              className="mb-2 ml-2 text-md font-medium text-gray-900"
            >
              Publish the article
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArticleForm;
