import useArticles from "../hooks/useArticles";

const ArticleListView = (props) => {
  const { articles, loading } = useArticles();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 p-5 min-h-full bg-slate-100">
      <div className="text-3xl text-center font-extrabold mt-3">list</div>
    </div>
  );
};

export default ArticleListView;
