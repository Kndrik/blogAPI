import useAuthRedirect from "../hooks/useAuthRedirect";

import Sidebar from "../components/Sidebar";
import ArticleListView from "./ArticleListView";
import ArticleView from "./ArticleView";
import NewArticleForm from "./NewArticleForm";

import { Routes, Route } from "react-router-dom";

const Dashboard = (props) => {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <Routes>
        <Route path="/" element={<ArticleListView />} />
        <Route path="/new" element={<NewArticleForm />} />
        <Route path="/:articleId" element={<ArticleView />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
