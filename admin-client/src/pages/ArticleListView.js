import useArticles from "../hooks/useArticles";

import ArticleCard from "../components/ArticleCard";

const ArticleListView = (props) => {
  const { articles, loading } = useArticles();
  if (loading) {
    return <div>Loading...</div>;
  }

  const articleCards = articles.map((article) => {
    return <ArticleCard article={article} key={article._id} />;
  });

  return (
    <div className="flex-1 p-5 min-h-full">
      <div className="text-5xl text-center font-extrabold mt-3 mb-10">
        All articles
      </div>
      <div className="grid gap-4 inlinde-grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {articleCards}
      </div>
    </div>
  );
};

export default ArticleListView;
