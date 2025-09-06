import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utility/axiosInstance";
import { API_PATH } from "../utility/apiPath";

export default function useUserAuth() {
  const { user, updateUser, clearUser } = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };
    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
}
