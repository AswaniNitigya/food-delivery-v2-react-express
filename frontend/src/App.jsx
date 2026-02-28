import React from "react";
import { Link, Route, Routes, useRoutes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import ForgotPass from "./pages/ForgotPass";
import UseGetCurrentUser from "./hooks/UseGetCurrentUser";

function App() {
UseGetCurrentUser()
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/" element={<Home />} />
      </Routes>
     
    </>
  );
}

export default App;
