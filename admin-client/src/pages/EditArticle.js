import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getArticleById, editArticle } from "../api";

import { decodeHtml } from "../Utilities";

const EditArticle = (props) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
        setTitle(decodeHtml(data.title));
        setContent(decodeHtml(data.content));
        setPublished(data.published);
        setLoading(false);
      } catch (err) {
        console.error("There was an error fetching the article", err);
      }
    };
    getArticle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        title: title,
        content: content,
        published: published,
      };
      await editArticle(article._id, data);
      navigate(`/dashboard/${article._id}`);
    } catch (err) {
      console.error("Couldn't edit the article", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full lg:w-4/6 bg-white p-10 px-20 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mt-4">Edit Article</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-md font-medium text-gray-900"
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
            Confirm Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
