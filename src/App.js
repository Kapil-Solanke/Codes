import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import { FBLogin } from "./pages/FBLogin";
import Register from "./pages/Register";
import { Error } from "./components/Error";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fb-login" element={<FBLogin />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/my-profile" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
