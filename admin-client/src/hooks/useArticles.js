import { useState, useEffect } from "react";
import axios from "axios";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/articles"
        );
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };
    getArticles();
  }, []);
  return { articles, loading };
};

export default useArticles;
