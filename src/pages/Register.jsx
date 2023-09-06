import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, username, email } = values;
     if (username?.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password?.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-[#1e4d91]">
      <div>
        <form action="" onSubmit={(event) => handleSubmit(event)} className="flex min-w-[400px] bg-white flex-col  gap-4 p-8 rounded-md">
          <div className="text-xl text-center mb-6">
            <h1>Create Account</h1>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="w-full">
              <div>UserName</div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="border-2 border-[#ababae] rounded-sm w-full p-2"
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label htmlFor="" className="w-full">
              <div>Email</div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="border-2 border-[#ababae] rounded-sm w-full p-2"
                onChange={(e) => handleChange(e)}
              />
            </label>
            <label htmlFor="" className="w-full">
            <div>Password</div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
              className="border-2 border-[#ababae] rounded-sm w-full p-2"
              />
              </label>
            
          <div className="flex items-center gap-2">
            <input type="checkbox" /> <span>Remember me</span>
          </div>
          </div>
          <button type="submit" className="w-full bg-[#1e4d91] mt-4 px-5 py-2 rounded-sm text-white">Create User</button>
          <div className="text-center">
            Already have an account ? <Link to="/login" className="text-[#4976b4]">Login.</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

