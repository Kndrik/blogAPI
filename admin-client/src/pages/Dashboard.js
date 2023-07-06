import useAuthRedirect from "../hooks/useAuthRedirect";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
  useAuthRedirect();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("blogJWT");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="text-xl text-center font-extrabold mt-3">Dashboard</div>
      <button
        onClick={handleLogOut}
        className="rounded-lg bg-blue-600 text-white font-bold text-sm px-4 py-2 hover:bg-blue-700"
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
