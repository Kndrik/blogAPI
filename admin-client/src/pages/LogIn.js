import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJWT } from "../api";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = { email, password };
      const token = await getJWT(data);
      localStorage.setItem("blogJWT", token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 w-full">
      <h1 className="font-extrabold text-3xl mb-4">Log In</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form className="w-96" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="block border border-gray-300 text-sm rounded-lg w-full p-2.5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-md font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block border border-gray-300 text-sm rounded-lg w-full p-2.5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
