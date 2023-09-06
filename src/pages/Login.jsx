import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import { AppContext } from "../context/AppContext";
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "", check: false });
  const { user, setUser } = useContext(AppContext);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)||user) {
      navigate("/my-profile");
    }
  }, []);

  const handleChange = (event) => {
    // setValues({ ...values, [event.target.name]: event.target.value });
    let { name, value, checked, type } = event.target;
    setValues((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    // console.log(values)
  };
  
  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        console.log('login failed')
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        if (values.check) {
        }
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        setUser(data.user);
        
        navigate("/my-profile");
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-[#1e4d91] flex flex-col items-center justify-center gap-4 ">
      <div className="">
        <form action="" onSubmit={(event) => handleSubmit(event)} className="flex min-w-[300px] bg-white flex-col  gap-8 p-8 rounded-md">
          <div className=" flex items-center justify-center gap-1">
            <h1>Login to your Account</h1>
          </div>
          <label htmlFor="text" className="w-full">
            <div>
              username
            </div>
            <input
              type="text"
              placeholder="manoj@richpanel.com"
              name="username"
              className="border-2 border-[#ababae] rounded-sm w-full p-2"
              onChange={(e) => handleChange(e)}
              min="3"
            />
          </label>
          <label htmlFor="" className="w-full">
            <div>Password</div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="border-2 border-[#ababae] rounded-sm w-full p-2"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={values.check}
              onChange={(e) => handleChange(e)}
            /> <span>Remember me</span>
          </div>
          <button type="submit" className="w-full bg-[#1e4d91] px-5 py-2 rounded-sm text-white">Log In</button>
          <div className="text-center">
            New to MyApp ? <Link to="/register" className="text-[#4976b4]">Sign Up.</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}


