import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("blogJWT");
      if (token) {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/auth/check",
          {
            token: token,
          }
        );
        if (!response.data.valid) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };
    checkToken();
  }, []);
};

export default useAuthRedirect;
