import React, { useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";

// importing icons

function Signout() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);

  // form react state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr] =useState("")
  const dispatch = useDispatch();

  // handle the Signout via api

  const handleSignout = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.get(
  `${import.meta.env.VITE_SERVER_URL}/api/auth/signout`,
  { withCredentials: true }
);
      setErr("")
      console.log(result.data);
      // clear redux auth/user state
      dispatch({ type: "auth/logout" });
    } catch (error) {
      setErr(error.response.data.message)
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-1g w-full max-w-md p-8 border-2 `}
        style={{ border: ` 1px solid ${borderColor}` }}
        
      >
        <button 
        className={`w-full h-10 mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
              onClick={handleSignout}>Sign Out</button>

      </div>
    </div>
  );
}

export default Signout;
