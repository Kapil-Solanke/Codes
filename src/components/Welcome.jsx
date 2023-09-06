import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )?.username
    );
  }, []);
  return (
    <div className="flex flex-col justify-center items-center text-black">
      <img src={Robot} alt="" className="h-[20rem]"/>
      <h1>
        Welcome, <span className="text-[#4e0eff]">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}

