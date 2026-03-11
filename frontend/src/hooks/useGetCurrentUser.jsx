import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function UseGetCurrentUser() {
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `${import.meta.env.VITE_SERVER_URL}/api/user/current`;
        console.log("Calling API:", url);

        const result = await axios.get(url, {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log("Axios Error:", error);
        if (error.response) {
          console.log("Server Response:", error.response.data);
        } else if (error.request) {
          console.log("No response received from server");
        } else {
          console.log("Request setup error:", error.message);
        }
      }
    };

    fetchUser()
  }, []);
}

export default UseGetCurrentUser;
