import { useNavigate } from "react-router-dom";
import logout from "../svgs/logout.svg";
import plus from "../svgs/plus.svg";

const Sidebar = (props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("blogJWT");
    navigate("/login");
  };

  const handleNewArticleClick = () => {
    navigate("/dashboard/new");
  };

  return (
    <div className="w-20 py-5 flex flex-col justify-between items-center shadow-2xl px-4">
      <div className="flex flex-col items-center w-full">
        <button
          onClick={handleLogoClick}
          className="mb-5 mt-5 w-full hover:bg-blue-200 aspect-square bg-blue-100 shadow-md rounded-lg font-extrabold text-blue-600 text-md hover:cursor-pointer"
        >
          Blog
        </button>
        <button
          onClick={handleNewArticleClick}
          className="mb-5 aspect-square bg-blue-500 hover:bg-blue-600 flex justify-center items-center w-full p-1 rounded-lg"
        >
          <img src={plus} alt="plus logo" className="hover:cursor-pointer" />
        </button>
      </div>
      <button
        onClick={handleLogOutClick}
        className=" bg-red-500 hover:bg-red-600 flex justify-center items-center w-full aspect-square p-1 rounded-lg"
      >
        <img src={logout} alt="logout logo" className="hover:cursor-pointer" />
      </button>
    </div>
  );
};

export default Sidebar;
