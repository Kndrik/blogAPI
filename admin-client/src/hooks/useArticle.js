import { useEffect, useState } from "react";
import { getArticleById } from "../api";

const useArticle = (articleId) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching the article", err);
      }
    };
    getArticle();
  }, []);

  return { article, loading };
};

export default useArticle;
