import { useEffect, useState } from "react";
import axios from "axios";

const useComments = (articleId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      const result = await axios.get(
        process.env.REACT_APP_API_URL + `/articles/${articleId}/comments`
      );
      const data = result.data;
      setComments(data);
      setLoading(false);
    };
    getComments();
  }, []);

  return { comments, loading };
};

export default useComments;
