import { useEffect, useState } from "react";
import axios from "axios";

const useArticle = (articleId) => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      const result = await axios.get(
        process.env.REACT_APP_API_URL + `/articles/${articleId}`
      );
      const data = result.data;
      setArticle(data);
      setLoading(false);
    };
    getArticle();
  }, []);

  return { article, loading };
};

export default useArticle;
