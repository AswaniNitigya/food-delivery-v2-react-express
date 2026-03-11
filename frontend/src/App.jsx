import React from "react";
import { Link, Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import ForgotPass from "./pages/ForgotPass";
import UseGetCurrentUser from "./hooks/UseGetCurrentUser";
import { useSelector } from "react-redux";
import Signout from "./pages/Signout";



function App() {
UseGetCurrentUser()
const { userData } = useSelector((state) => state.user)
console.log("Redux userData:", userData)
const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/signup" element={!userData?.user ? <Signup/> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!userData?.user ? <Signin/> : <Navigate to={"/"}/> } />
        <Route path="/signout" element={<Signout />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/" element={userData?.user ? <Home/> : <Navigate to={"/signin"} />} />
      </Routes>
      
     
    </>
  );
}

export default App;
