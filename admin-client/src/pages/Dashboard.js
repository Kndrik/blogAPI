import useAuthRedirect from "../hooks/useAuthRedirect";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

const Dashboard = (props) => {
  useAuthRedirect();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-100 min-h-full">
        <div className="text-xl text-center font-extrabold mt-3">Dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
