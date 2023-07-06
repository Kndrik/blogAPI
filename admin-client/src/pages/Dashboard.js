import useAuthRedirect from "../hooks/useAuthRedirect";

import Sidebar from "../components/Sidebar";

const Dashboard = (props) => {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-5 min-h-full bg-slate-100">
        <div className="text-3xl text-center font-extrabold mt-3">
          Dashboard
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
