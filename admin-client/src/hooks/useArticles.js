import { useState, useEffect } from "react";
import { getAllArticles } from "../api";

const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data);
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
