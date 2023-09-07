import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "./ChatContainer";
import Conversations from "./Conversations";
import Welcome from "./Welcome";
import { AppContext } from "../context/AppContext";
import { Profile } from "./Profile";
export default function ConversationContainer() {
  const navigate = useNavigate();
  const socket = useRef();
  const {user}=useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const checkLogin = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        console.log('user',user)
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    };
    checkLogin();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchDetails();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    console.log("currentchat is",currentChat);
  };
  return (
    <div className="min-w-screen h-screen overflow-hidden  bg-white">
      <div className="flex flex-col justify-center items-center">
        <div className="container grid grid-cols-[20%_80%] ">
          <Conversations contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <div className="flex w-full">
              <div className="w-[75%]">
            <ChatContainer currentChat={currentChat} socket={socket} />
              </div>
              <div className="w-[25%]">
              <Profile user={currentChat}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


