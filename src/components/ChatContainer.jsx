import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const options = {
    weekday: "short",
    day: "numeric",
  };
  
  const timeStamp = (
    <>
      {new Date().toLocaleDateString("en-US", options)}{" "}
      {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
    </>
  );
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      // console.log("chatcontainer",data);
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat?._id,
      });
      setMessages(response.data);
    };
    fetchDetails();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen overflow-hidden flex flex-col ">
      <div className="chat-header min-h-[10%] text-3xl border-b-2">
        <div className="user-details">
          <div className="username">
            <h3 className="text-black p-5">{currentChat?.username}</h3>
          </div>
        </div>
          
      </div>
      <div className="chat-messages min-h-[80%] flex flex-col gap-4 px-4 py-2 overflow-scroll bg-[#f5f5f5]">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message flex items-center   ${
                  message.fromSelf ? "sended justify-end" : "recieved justify-start"
                }`}>
                <div className="content max-w-[40%] flex flex-col gap-1 ">
                  <p className="bg-[#ffffff] px-2 py-2 rounded-md ">{message.message}</p>
                  <p className="justify-end">{timeStamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[10%] justify-end bg-[#e8e7e7]">
      <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </div>
  );
}


